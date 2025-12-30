---
description: HTTP, HTTPS
tags:
  - HTTP
  - HTTPS
  - 프로토콜
date: 2025-12-28
modified: 2025-12-28
draft: false
---
HTTP(HyperText Transfer Protocol), HTTPS(HyperText Transfer Protocol Secure) 프로토콜은 TCP 기반 애플리케이션 계층 프로토콜이다.

**HTTP(80/TCP)**
- 웹에서 클라이언트-서버가 요청(Request)/응답(Response) 형태로 리소스를 교환하는 프로토콜이다.
- HTTP 자체는 암호화가 없다. 
- HTTP는 Stateless라서 로그인 상태 같은 것은 쿠키/세션/토큰으로 애플리케이션 단에서 해결한다.

> [!note] HTTP 메서드
> 메서드는 이 리소스에 대해 서버가 어떤 동작을 해야 하는지를 나타낸다.
> Safe: 서버의 리소스 상태를 변경하지 않는 요청
> Idempotent: 리소스 상태가 변경이 있더라도 같은 요청을 N번 반복했을 때 최종 리소스 상태가 같게 수렴하는 요청
> 
> **GET:** 리소스 조회 (Safe, Idempotent)
> **POST:** 생성/처리
> **PUT:** 리소스 전체 교체 (Idempotent)
> **PATCH:** 리소스 부분 수정
> **DELETE:** 리소스 삭제 (Idempotent)
> **HEAD:** GET과 동일하나 헤더만 받음(존재/캐시 확인)
> **OPTIONS:** 서버가 허용하는 메서드/정책 확인

**HTTPS(443)**
-  HTTP 메시지를 TLS로 암호화해서 전달하는 방식이다.
- 서버 인증서 기반으로 서버 신원 확인, 기밀성, 무결성을 제공한다.
- HTTP/1.1·2는 보통 TCP위에서, HTTP/3은 QUIC(UDP 기반) 위에서 동작한다.

- 전송 시 주요정보 노출 취약점은 HTTP로 전송 시 발생한다.