---
description: SSH, Telnet
tags:
  - 프로토콜
  - SSH
  - Telnet
date: 2025-12-29
modified: 2025-12-29
draft: false
---
- SSH(Secure Shell), Telnet은 원격으로 시스템에 접속해 명령을 실행하기 위한 TCP 기반 애플리케이션 계층 프로토콜이다.

**Telnet**
- 텔넷은 원격 터미널 접속을 제공하는 프로토콜로, 기본적으로 암호화가 적용되지 않는다.
- TCP 23번 포트를 사용한다.

**SSH**
- SSH는 원격 접속을 제공하는 프로토콜로 통신 내용을 암호화한다.
- TCP 22번 포트를 사용한다.

**차이점**
- SSH는 암호화를 제공하지만 Telnet은 평문으로 통신하여 보안에 취약하다.
- 따라서 23번 포트가 외부에 노출되어 있다면 위험할 수 있다.