---
description: CSRF(Cross-Site Request Forgery)
tags:
  - CSRF
date:
modified:
draft: true
---
**CSRF(Cross-Site Request Forgery, 사이트 간 요청 위조)**
- CSRF란 사용자가 이미 로그인해 있는 상태를 악용해서, 공격자가 사용자의 브라우저가 사용자 의도와 다른 요청을 해당 서비스에 보내게 만드는 공격이다.
- 서버가 사용자의 브라우저에 저장된 세션이나 쿠키를 신뢰하는 점을 악용하는 공격이다.
- CSRF 공격이 발생하면 서버의 입장에서는 피해자가 공격자처럼 보이게 된다.

**XSS와 CSRF 차이**
- XSS: 취약한 웹페이지에 스크립트가 주입되어 피해자의 브라우저에서 실행
- CSRF: 피해자의 브라우저가 의도치 않은 요청을 다른 사이트로 보내도록 강제