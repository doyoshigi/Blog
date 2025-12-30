---
description: SQL Injection, Blind SQL Injection
tags:
date: 2025-12-30
modified: 2025-12-30
draft: false
---
**SQL Injection**
- 웹페이지에서 사용자의 입력이 적절히 검증되지 않고 SQL 쿼리 구분에 포함되는 것을 이용한 공격이다.

**Blind SQL Injection**
- SQL Injection은 가능하지만 쿼리 결과나 에러 화면을 직접 보여주지 않아서 참/거짓 반응이나 응답 시간 같은 간접 신호로 데이터를 한 글자씩 추론하는 공격이다.
	- Boolean Based Blind SQL Injection
		- SQL 쿼리가 참/거짓일 때 출력되는 페이지나 패킷의 차이로 추론합니다.
	- Time Based Blind SQL Injection
		- SQL 쿼리아 참/거짓일 때 응답시간을 다르게 하여 추론합니다.