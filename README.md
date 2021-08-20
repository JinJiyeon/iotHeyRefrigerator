# 프로젝트 명

---

## :bulb: 목차

- [프로젝트 소개](#프로젝트-소개)   
- [텍스트 ... ](#프로젝트-소개)   
- [프로젝트 명세](#프로젝트-명세)
  - [배포 환경](#배포-환경)
  - [개발 환경](#개발-환경)
  - [Design Resources](#design-resources)
  - [핵심 라이브러리](#핵심-라이브러리)
  - [Ganttchart](#Gantt-Chart)
  - [진행과정](#진행과정)

<br>

<br>

## :book: 프로젝트 소개

#### 2030 1인가구를 위한 냉장고 관리 서비스

- 팀명: 7링바이브
- 트랙 : IoT

### :soccer: 목표

점점 늘어가는 2030 1인가구를 위한 냉장고 매니저이고, 2030 1인가구들의 입장에서 냉장고를 보다 효율적으로 활용할 수 있게 서비스를 제공하고자 함.
<br>

#### :boy: 우리의 페르소나

![페르소나](README.assets/페르소나.png)

- 요리에 관심이 있고 레시피 추천이 필요한 사람
- 요리에 관심이 있지만 재료관리를 잘 못하는 사람
- 요리에 크게 관심이 없어 냉동 식품을 쌓아두고 먹는 사람

 여러 케이스의 사람들을 모두 만족시켜주기 위한 기능들을 구현하고, 작성한 목업에 따라 웹페이지를 완성한 후, 이를 라즈베리파이의 터치스크린을 통하여 보여주는 흐름을 구상하였습니다.

---

#### :envelope_with_arrow: 활용기술스택

![기술스택](README.assets/기술스택.jpg)

React, Node.js, Django, DB(Mysql), 아두이노, 라즈베리파이, Whimsical, Python, Vanilla JS, vsCode, Chrome Browser, 센서 등 다양한 툴을 사용하고 있으며, 체계적인 프로젝트를 위해 Jira, Notion, GitLab등의 협업툴을 활용했습니다.

#### :classical_building: ERD

![ERD](README.assets/ERD-1629428052595.png)

### :triangular_ruler: 시퀀스 다이어그램



---

## :notebook_with_decorative_cover: 프로젝트 명세

### :airplane: 배포 환경

- __URL__ : 
- __배포 여부__ : O / X
- __접속 가능__ : 접속 가능 / 수정 중
- __HTTPS 적용__ : O / X
- __PORT__ : // 3rd Party에서 사용하는 포트가 있다면 기입해주세요. <- 기입 후 해당 주석 삭제
  <br>

### :house: 개발 환경

#### Front-end [Link](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13B107/-/blob/master/frontend/README.md)

- __Framework__ : React  (Ver : 4.0.3)
- __지원 환경__ : Web / IoT(라즈베리 파이)
- __담당자__ : 차성민, 엄재식
  <br>

#### Back-end [Link](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13B107/-/tree/master/backend)

- __Framework__ : Node.js, Express / Django
- __Database__ : Mysql
- __담당자__ : 박민상, 윤소영, 진지연
  <br>

#### Design

- Material-UI 및 Bootstrap 활용
- __담당자__ : 차성민, 엄재식
  <br>

__자체 제작 산출물__ (필요시 이미지 또는 설명 첨부)

- LOGO
- CardView
- Button
- Calendar
  <br>

### :orange_book: 핵심 라이브러리

기본 제공하는 라이브러리 외 핵심 기능 구현에 사용한 라이브러리가 있다면 작성해주세요.   
예시 ) VR/AR 라이브러리, 애니메이션 라이브러리, 텍스트/사진/동영상 지원, 편집 라이브러리 등

- __Material - UI __
  - __링크__ : https://developers.google.com/ar
  - __소개__ : 
  - __사용 기능__ : 디자인 컴포넌트 제공
  - __담당자__ : 차성민, 엄재식
- __Bootstrap __
  - __링크__ : https://developers.google.com/ar
  - __소개__ : 
  - __사용 기능__ : 디자인 컴포넌트 제공
  - __담당자__ : 차성민, 엄재식




## :chart_with_upwards_trend: Gantt Chart 

```mermaid
gantt
    dateFormat  MM-DD
    title       7링 바이브 진행 현황
    %% excludes    weekends
    %% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

    section 프로젝트 준비
    주제 선정				  :done, 07-12, 1d
    기능 목록 상세 도출			:done, 07-13, 4d
    화면 기획				  :crit, active, 07-14, 10d
    개발 환경 구성             :done, 07-12, 5d
	
	section Frontend
    사전 공부 및 예제 실습 :active, 07-15, 11d    
    백단과 폴더 트리구조 동기화  :crit, active, 07-24, 2d
    프로토타입 페이지 제작 및 서버와의 연결 테스트 :active, 07-27, 3d
    자체 컴포넌트 구상 및 구현: crit, active, 07-27, 7d
    페이지 구현	 :crit, active, front1, 07-28, 18d
    - Main : 07-28, 2d
    - Auth : 07-30, 2d
    - Recipes : 08-01, 10d
    - Ingredients : 08-01, 10d
    - Mypage : 08-11, 1d
    - Not found : 08-12, 1d
    기능 구현	 :crit, active, front1, 08-08, 7d
    - Client, Server 연동 : 08-08, 1d
    - 페이지 틀 제작 마무리 및 디자인 : 08-09, 2d
    - 회원가입 중복처리 : 08-11, 1d
    - 패스워드 확인 : 08-11, 1d
    - 인피니티  스크롤 : 08-12, 1d
    - 검색어 처리 : 08-12, 1d
    - 토글로 레시피 검색 및 추천항목 변경 : 08-13, 1d
    - 레시피 좋아요 기능 : 08-13, 1d
    - 가상 키보드 추가 : 08-14, 1d
    - 타이머 기능 추가 : 08-14, 1d
    디자인작업 및 최종 마무리 : 08-08, 7d

    
    section Backend
    사전 공부 및 예제 실습 : done, 07-07, 13d
    DB 모델링 및 데이터 수집 : done, 07-19, 7d
    데이터 전처리 : done, 07-26, 3d
    연관어 검색 : done, 07-29, 2d
    Django 추천 : done, 07-29, 7d
    추천 개선 : 08-11, 4d

    jwt 로그인 : done,07-23, 10d
    레시피 조회 : done, 07-26, 2d
    재료CRD : done, 08-02, 2d
    mypage: done, 08-04 , 1d
    좋아요 : done, 08-05, 2d

    배포: active, 08-09, 11d

    section IoT
    장비 확인 :done, 07-19, 3d
    IoT 학습 : active, 08-03, 4d
    IoT 환경셋팅 : active, 08-07, 5d
    터치 패널에 출력 :crit, active, smtp, 08-10, 2d
    Node 연동 : 08-11, 2d
    시간 알림벨 : 08-13, 3d
    유통기한 알림벨 : 08-13, 3d

    section Ucc제작 및 발표준비
    발표 자료 :crit, active, rtc1, 08-16, 4d
    Ucc 제작 :crit, active,08-16, 4d
   

    section QA 및 
    QA 및 버그 찾기               :07-20, 31d
    
    %%section 기타
    %%UCC제작 :11-23, 3d
    %%발표준비 :11-26, 2d
```

##  :rainbow: 결과물

> #### 결과물 간략 요약 페이지 예시 사진입니다.
>
> ### :star:  회원페이지
>
> ![signin](README.assets/signin.jpg)
>
> 
>
> ### :star:  홈페이지
>
> ![home](README.assets/home.jpg)
>
> 
>
> ### :star:  레시피
>
> ![recipe](README.assets/recipe.jpg)
>
> 
>
> ### :star:  레시피 서치
>
> ![search](README.assets/search.jpg)
>
> 
>
> ### :star:  레시피 디테일
>
> ![recipe-detail](README.assets/recipe-detail.jpg)
>
> 
>
> ### :star:  유통기한 추천
>
> ![expired-recommend](README.assets/expired-recommend.jpg)



## 기획 산출물

![와이어프레임 및 화면정의서_1](README.assets/와이어프레임 및 화면정의서_1.png)