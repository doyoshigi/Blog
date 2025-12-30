---
description: Stack Buffer Overflow 취약점
tags:
  - 취약점
  - StackBufferOverflow
date: 2025-12-23
modified: 2025-12-23
draft: false
---
## Stack Buffer Overflow 취약점
### Stack Buffer Overflow란?
Stack Buffer Overflow란 스택에 할당된 버퍼에 버퍼의 크기보다 큰 데이터를 쓰려고 할 때 프로그램이 경계 검증을 하지 않아 인접한 스택 메모리(다른 로컬 변수, return address 등)에 값이 덮어씌어지는 것을 말한다.

스택에는 리턴 주소 등의 제어 흐름에 중요한 값들이 존재할 수 있으므로, Stack Buffer Overflow는 프로그램 오작동을 일으키거나 보안 취약점으로 악용될 수 있다.

### Stack Buffer Overflow 취약점
버퍼에 경계 검증을 하지 않고 값을 쓸 수 있는 입력경로가 존재한다면 이를 Stack Buffer Overflow 취약점이라고 한다.
