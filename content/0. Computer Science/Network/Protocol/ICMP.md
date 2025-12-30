---
description: ICMP
tags:
  - ICMP
  - 프로토콜
date: 2025-12-29
modified: 2025-12-29
draft: false
---
**ICMP(Internet Control Message Protocol**
- ICMP는 IP 네트워크 통신 중 발생한 오류 상황을 알리거나 네트워크 진단 정보를 전달하기 위해 사용하는 네트워크 계층 프로토콜이다.
- **대표 도구**
	- `ping`은 목적지로 ICMP Echo Request를 보내고, 목적지로부터 ICMP Echo Reply를 받아 도달 가능 여부 및 왕복 지연 시간을 확인한다.
	- `traceroute`는 목적지로 보내는 패킷의 TTL 값을 1부터 1씩 증가시키며 전손한다. 패킷이 중간 라우터를 지나는 동안 TTL이 0이되면, 해당 라우터가 출발지로 ICMP Time Exceeded 메시지를 보내 이를 통해 중간 경로를 파악할 수 있다.
- **오류 메시지**
	- **코드 2: 프로토콜 도달 불가(Destination protocol unreachable)**
		- 목적지 호스트가 IP 헤더의 Protocol 필드가 가리키는 프로토콜을 지원/처리하지 못할 때 발생한다. 
	- **코드 3: 포트 도달 불가(Destination port unreachable)**
		- 목적지 호스트에 해당 포트를 수신 대기 중인 프로세스가 없을 때 발생한다.
	- **코드 4: 단편화 필요(Fragmentation Needed and DF flag set)**
		- 중간 라우터가 다음 링크의 MTU(Maximum Trasmissio Unit, 최대 전송 단위) 때문에 단편화가 필요하지만, 패킷에 DF 플래그가 설정되어 단편화할 수 없을 때 발생한다.