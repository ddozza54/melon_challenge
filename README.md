# 🥾 한사랑 산악회 뮤직앱 

유튜브 컨텐츠 '한사랑 산악회'에 나오는 노래들을 활용한 뮤직플레이어 웹사이트 입니다. 


<br>

<div>
<a href="https://port-0-melon-challenge-1maxx2algqmtl28.sel3.cloudtype.app/">
<img src="https://flexible.img.hani.co.kr/flexible/normal/640/360/imgdb/original/2021/0317/20210317503211.jpg">
</div>

이미지를 클릭 시, 배포한 페이지로 이동이 가능합니다.

<a href="https://youtube.com/playlist?list=PL1nP78IpsXsMam6_mF2rto1RgxQH_t26K"/>
 <span> &rarr; 한사랑 산악회 원본 유튜브 바로가기 </span>

<br>


## 🎵 목차

1. 프로젝트 소개

2. 개발 기술

3. 주요 기능

4. 구현 기능 

5. 개선하고 싶은 항목

6. 실행 및 배포

<br>

## 📝 1. 프로젝트 소개

### 개요

- 유튜브 컨텐츠 '한사랑 산악회'에 나오는 노래들을 활용한 뮤직플레이어 웹사이트 입니다. 

- 노래의 플레이 순으로 차트를 확인할 수 있습니다.

- 로그인이 가능하며 찜하기를 통해 유저별 플레이리스트 만들기가 가능합니다.

- 실제로 있는 음원이 아니기 때문에, 노래와 썸네일, 가사는 직접 등록해서 제공합니다.

- master 권한이 있는 유저만 곡 업로드, 수정이 가능합니다.

- 플레이리스트에서는 재생, 정지, 한곡 반복, 볼륨 조절이 가능하며, 가사를 동시에 볼 수 있습니다.

- 로그인 한 유저는 방명록 작성이 가능합니다.


### 제작 목적

- 노마드코더의 멜론 클론 챌린지에 참여하기 위한 프로젝트입니다.

- pug, express, Mongodb, scss 등 배웠던 내용을 복습하기 위함입니다. 

### 제작 기간

- ver.1 : 2023.3.31 - 2023.4.21

<br>


## 🖥️ 2. 개발 기술

### Front End

<img src="https://img.shields.io/badge/PUG-A86454?style=for-the-badge&logo=PUG&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-efd81d?style=for-the-badge&logo=Javascript&logoColor=white"/>

## Back End

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/Mongo DB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

## Tools

<img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Git-e84d31?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/VScode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white">

<br>

## 🪩 3. 주요 기능

### ⛰️ 회원가입, 로그인 기능

- 첫 페이지에서 로그인이 가능합니다.
- 로그인 시 가입이 안되어있다면 회원가입 페이지로 이동 & 가입이 가능합니다.

### ⛰️ 전체 곡 - 인기 순 차트 배열

- 곡의 정보 (이미지, 원곡 제목, 원곡 아티스트, 설명) 을 볼 수 있습니다.

- 모든 곡을 플레이 수 순으로 볼 수 있습니다.

- 플레이 수는 노래가 끝나면 자동으로 +1 카운트가 됩니다.

- 제목을 클릭하면 곡을 들을 수 있습니다.

- 따봉 버튼을 눌러 플레이리스트에 바로 추가/제거가능가능합니다.

### ⛰️ 뮤직 플레이어

- 리스트에서 클릭한 곡을 들을 수 있습니다.

- 재생/정지가 가능합니다.

- 한곡 반복 듣기가 가능합니다.

- 찜 버튼을 눌러 플레이리스트에 추가/제거 가 가능합니다.

- range input을 이용해 볼륨의 조절, 재생 위치의 이동이 가능합니다.

- 내장된 가사를 함께 볼 수 있으며, 플레이리스트를 간단하게 볼 수 있습니다.

- (숨겨진 기능 1 :: 곡 수정 기능 : master 권한을 가진 유저만 곡 정보 수정이 가능합니다. 
오디오, 이미지 파일은 변경이 불가하며 text로 이루어진 정보들만 수정할 수 있습니다.)

### ⛰️ 플레이 리스트 (찜 하기)

- 데이터 베이스에 저장된 유저의 playlist 정보를 가져와 목록에 표시합니다.

- 찜하기 버튼을 누르면 데이터베이스에서 저장/제거가 됩니다.

- 제거 시, 바로 사라지는 것이 아니라서 실수로 제거한 곡은 바로 재추가가 가능합니다.

### ⛰️ 업로드 기능

-  (숨겨진 기능 2 :: 곡의 업로드 : 오디오 파일, 썸네일 파일 등과 함께 음원 업로드가 가능합니다.
 master 권한이 있는 유저만 업로드가 가능하며 nav의 아이콘도 일반 유저에겐 보이지 않습니다.)

### ⛰️ 방명록

- 로그인한 유저에 한 해 간단한 방명록 작성이 가능합니다. 

- 닉네임, 시간, 작성한 내용이 표기됩니다.

### ⛰️ 배경 자동 전환

- 자연을 고스란히 느낄 수 있는 배경이 10초마다 변경되어 봄나들이가 필요 없습니다.

<br>

## 🖼️ 4. 구현 기능 이미지

첫 페이지
<img src="https://i.imgur.com/QMYkiVa.jpg"/>

노래 전체 목록
<img src="https://i.imgur.com/QBNaRNV.jpg"/>

뮤직 플레이어
<img src="https://i.imgur.com/aor82HE.jpg"/>

찜한 곡 플레이리스트

<img src="https://i.imgur.com/ELaMTEH.png"/>

곡 수정 & 업로드 nav
<img src="https://i.imgur.com/LZdkWgZ.jpg"/>

방명록
<img src="https://i.imgur.com/MmJv05N.jpg"/>

<br>

## 🔨 5. 개선하고 싶은 항목

- 현재 이전/이후 곡으로 넘어가지 않는 기능 구현하기

- 유튜브 링크로 바로 연결되는 버튼 활성화 혹은 바로 볼 수 있는 page 생성

- 모바일 화면에 맞춘 UI 구현

- 재생 목록을 여러개 만들 수 있도록 하는 기능


<br>

## 🌍 6. 배포

- 클라우드 타입을 이용한 배포

- mongoDB 와 AWS S3 을 이한 데이터 관리
