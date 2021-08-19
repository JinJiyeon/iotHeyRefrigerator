import os 
import json
import requests
import numpy as np
import pandas as pd
from django.http.response import JsonResponse
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# 배포 전에 dotenv 바꿔주기
NODE_ORIGIN = os.environ.get("NODE_ORIGIN")
DJANGO_ORIGIN = os.environ.get("DJANGO_ORIGIN")
RETAINING = '/user/myingredients/important'
EXPIRE = '/user/myingredients/expired'



def convert_from_retaining_ingredient(cookies):
    # node에서 보유 중인 재료 가져오기
    url = NODE_ORIGIN + RETAINING  
    res = requests.get(url, cookies=cookies).json()

    # 계산할 형식에 맞추기 (dataframe으로, 반정규화, 문자열로)
    tmp_my_ingredient = []
    col = 'ingredient'
    for r in res:
        tmp_my_ingredient.append(r['ingredient_name'])
    print('보유 중인 재료 벡터로 변환', tmp_my_ingredient)
    my_ingredinet = pd.DataFrame(data={col:[' '.join(tmp_my_ingredient)]})
    
    return my_ingredinet

def convert_from_urgent_expiration_date(cookies):
    # node에서 보유 중인 재료 가져오기
    url = NODE_ORIGIN + EXPIRE
    res = requests.get(url, cookies=cookies).json()
    # 계산할 형식에 맞추기 (dataframe으로, 반정규화, 문자열로)
    tmp_my_ingredient = []
    col = 'ingredient'
    for r in res:
        tmp_my_ingredient.append(r['ingredient_name'])
    my_ingredinet = pd.DataFrame(data={col:[' '.join(tmp_my_ingredient)]})

    
    return my_ingredinet


def get_recipe_df():
    # Django static에서 가져오기
    # 주의) res.json()은 json 스타일로 파싱하는 것임. python에서는 dict로 인식함
    url = DJANGO_ORIGIN + '/static/recipe.json'
    res = requests.get(url).json()
    recipe_df = pd.DataFrame.from_dict(res)
    return recipe_df


def find_similar_recipe(recipe_df, tmp):
    # 벡터 변환기 생성
    count_vect = CountVectorizer(min_df=0, ngram_range=(1,2))
    count_vect = count_vect.fit(recipe_df['ingredient'])

    # 벡터 변환 > 유사도 계산 > 정렬
    ing_mat = count_vect.transform(tmp['ingredient'])       # (497,995)
    ing_sim = cosine_similarity(ing_mat, ing_mat)
    ing_sim_sorted_ind = ing_sim.argsort()[:,::-1]

    # 유사한 순으로 추출 > 조회수 많은 순으로 정렬
    top_n = 3   # 프론트와 논의 필요
    similar_indexes = ing_sim_sorted_ind[tmp.shape[0]-1, 1:2*top_n]     # tmp.shape[0]-1 = 맨 마지막 행
    similar_recipes = recipe_df.iloc[similar_indexes].sort_values('view', ascending=False)[:top_n]
    
    # recipe_id만 추출
    similar_recipes_id = []
    for r in similar_recipes['recipe_info_id']:
        similar_recipes_id.append(r)
    return similar_recipes_id


def recommend_from_retaining_ingredient(request):
    # 계산 형식에 맞추기
    cookies = dict(accessToken=request.headers.get('Cookie').split('=')[1])
    my_ingredient = convert_from_retaining_ingredient(cookies)
    
    # 보유한 재료가 없으면 빈 배열을 보냄
    if not my_ingredient.iloc[0,0]:
        similar_recipes_id = []
    # 보유한 재료가 있으면 추천 레시피를 계산함
    else:
        recipe_df = get_recipe_df()
        tmp = recipe_df[['ingredient']].append(my_ingredient, ignore_index=True)
        similar_recipes_id = find_similar_recipe(recipe_df, tmp)
    
    # 노드에 넘겨줌
    to_node = {'similar_recipe_id':similar_recipes_id}
    return JsonResponse(to_node, safe=False)

def recommend_from_urgent_expiration_date(request):
    # 계산 형식에 맞추기
    cookies = dict(accessToken=request.headers.get('Cookie').split('=')[1])
    my_ingredient = convert_from_urgent_expiration_date(cookies) 

    # 임박한 재료가 없으면 빈 배열을 보냄
    if not my_ingredient.iloc[0,0]:
        similar_recipes_id = []
    # 보유한 재료가 있으면 추천 레시피를 계산함
    else:
        recipe_df = get_recipe_df()
        tmp = recipe_df[['ingredient']].append(my_ingredient, ignore_index=True)
        similar_recipes_id = find_similar_recipe(recipe_df, tmp)
    
    # 노드에 넘겨줌
    to_node = {'similar_recipe_id':similar_recipes_id}
    return JsonResponse(to_node, safe=False)
