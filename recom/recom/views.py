from django.shortcuts import render
import requests
from django.http.response import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json

def index(request):
    return render(request, 'index.html')

node_origin = 'http://localhost:3000'

def node_to_django(request):

    url = node_origin + '/test/myingredient'
    res = requests.get(url)
    # 문자열을 json 형식으로 파싱
    str_to_json = json.loads(res.text)
    str_to_json['id'] += 1

    return JsonResponse(str_to_json, safe=False)

def django_to_node(request):
    res = {'msg':'this is from django'}
    return JsonResponse(res, safe=False)
    
def nodedb_to_django(request, recipe_id):
    url = node_origin + f'/test/nodedb_to_django/{recipe_id}'
    res = requests.get(url)
    
    return JsonResponse(res.json(), safe=False)
