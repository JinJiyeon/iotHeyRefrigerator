# :facepunch: Backend

---

## :bulb:목차

- [소개](#소개)
- [목표](#목표)
- [트리구조](#트리구조)
- [결과물](#결과물)

<br>

<br>

### :wave: 소개

- __Framework__ : Node.js, Express/ Django
- __Database__ : Mysql
- __지원 환경__ : Web / IoT(라즈베리 파이)
- __담당자__ : 박민상, 윤소영, 진지연

---

### :soccer: 목표

로그인, 마이페이지, 레시피 입력 및 좋아요 등, 기본 기능을 충실하게 구현

사용자 편의를 고려하여 데이터 관리 및 연관어 검색 기능 제공

IoT 기기 연결 및 편의 기능 구현

---

### :deciduous_tree: 트리구조

1. __node.js__

    ```bash
    ├── auth
    │   ├── login
    │   ├── signup
    │   └── 
    ├── user
    │   ├── myingredients/important
    │   ├── myingredients/expired
    │   ├── myingredients
    │   ├── myingredients/add
    │   ├── myingredients/delete
    │   ├── myingredients/modify
    │   ├── myingredients/associated/:serachWord
    │   └── mypage
    └── recipe
        ├── recom/important
        ├── recom/expired 
        ├── search/title/:searchWord 
        ├── search/ingredient/:searchWord
        └── :recipeId
    ```
2. __Django__

    ```bash
    └── recipe
        ├── recom/important/
        └── recom/expired/
    ```



---

### 🍳 결과물

- 추천 알고리즘

  ![image-20210805173656207](README.assets\image-20210805173656207.png)

  ![image-20210805173724431](README.assets\image-20210805173724431.png)

  ![image-20210805173800560](README.assets\image-20210805173800560.png)

  ![image-20210805173816840](README.assets\image-20210805173816840.png)

- 연관어 검색

![image-20210805173621564](README.assets\image-20210805173621564.png)
