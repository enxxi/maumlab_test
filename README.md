## [ 마음연구소 백엔드 코딩 테스트 버전 3_이은석 ]

---

<br/>
<details>
  <summary>폴더구조</summary>

```jsx
📦src
 ┣ 📂apis
 ┃ ┣ 📂option
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜option.module.ts
 ┃ ┃ ┣ 📜option.repository.ts
 ┃ ┃ ┣ 📜option.resolver.ts
 ┃ ┃ ┗ 📜option.service.ts
 ┃ ┣ 📂question
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜question.module.ts
 ┃ ┃ ┣ 📜question.repository.ts
 ┃ ┃ ┣ 📜question.resolver.ts
 ┃ ┃ ┗ 📜question.service.ts
 ┃ ┣ 📂response
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜response.module.ts
 ┃ ┃ ┣ 📜response.repository.ts
 ┃ ┃ ┣ 📜response.resolver.ts
 ┃ ┃ ┗ 📜response.service.ts
 ┃ ┗ 📂survey
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜survey.entity.ts
 ┃ ┃ ┣ 📜survey.module.ts
 ┃ ┃ ┣ 📜survey.repository.ts
 ┃ ┃ ┣ 📜survey.resolver.ts
 ┃ ┃ ┗ 📜survey.service.ts
 ┣ 📂config
 ┃ ┗ 📜typeorm.config.ts
 ┣ 📂utils
 ┃ ┣ 📂graphql
 ┃ ┃ ┗ 📜schema.gql
 ┃ ┣ 📂logger
 ┃ ┃ ┗ 📜winston.util.ts
 ┃ ┗ 📜commonFunction.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
```

</details>

<details>
  <summary>사용 기술 스택</summary>

언어 및 사용 도구 <br/> ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
<br/>
데이터 베이스 <br/>![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) <br/>

</details>

<br/>

### 개발 서버 실행

npm run start:dev

<br/>

## 기능 설명

1.  객관식 설문지의 데이터 베이스 [설계](https://www.erdcloud.com/d/TT2cH5YPJWCAyyapn): 설문지, 문항, 선택지, 답변 등을 관리하기 위한 관계형 데이터 모델을 설계하였습니다. 

<br/>

3.  설문지 CRUD: 설문지를 생성, 조회, 수정, 삭제할 수 있는 API 구현.
   
    - isCompleted 필드를 추가하여 설문지의 완료 여부를 체크했습니다.
    - 설문지 조회 시, 설문지에 포함된 질문들을 함께 조회가 가능하게 구현하였습니다.
    - 각 설문지의 답변 총점을 반환하는 API를 구현하였습니다.
<br/>

4.  문항 CRUD: 설문지 내의 문항에 대한 생성, 조회, 수정, 삭제 API 구현.
    
    - 잘못된 survey id에 대한 예외 처리를 구현하였습니다.
    - 문항 조회 시, 문항에 포함된 선택지들과 함께 조회가 가능하게 구현하였습니다.
<br/>

5.  선택지 CRUD: 문항의 선택지에 대한 생성, 조회, 수정, 삭제 API 구현.

    - 각 선택지는 점수를 가지며, 답변의 총점 계산에 사용됩니다.
    - 잘못된 question id에 대한 예외 처리를 구현하였습니다.
<br/>

6.  답변 CRUD: 사용자의 답변에 대한 생성, 조회, 수정, 삭제 API 구현.
<br />

<img src="https://github.com/enxxi/maumlab_test/assets/101889199/d89efd9a-b3f6-4c97-b475-d080df858474.png"  width="200" height="300"/>


<img src="https://github.com/enxxi/maumlab_test/assets/101889199/838175f7-ba56-4c11-afec-616e70d98135.png" width="200" height="300"/>

6.  에러 처리: 만약 요청이 실패하면, 적절한 에러 메시지를 반환하도록 구현하였습니다. 공통 함수를 사용하여 일관된 형식의 에러를 반환할 수 있게 하였습니다.
<br />

7.  로그: 에러 또는 특이 사항 발생을 대비하기 위해 winston을 사용해 로깅을 설정하였습니다.
<img src="https://github.com/enxxi/maumlab_test/assets/101889199/420ae0c0-85a7-45c0-b0bb-8c4df592440a.png" width="600" height="300"/>

<br />

8. 레포지토리 패턴을 사용하여 각 코드의 관심사를 분리하였습니다. 이를 통해 가독성과 유지보수성을 향상시켰습니다. 
<br />

