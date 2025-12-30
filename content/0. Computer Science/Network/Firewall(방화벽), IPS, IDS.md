---
description: Firewall, IPS, IDS
tags:
  - Firewall
  - IPS
  - IDS
date: 2025-12-29
modified: 2025-12-29
draft: false
---
**Firewall**
- 방화벽은 IP, Port, 프로토콜 기반으로 트래픽을 허용하거나 차단하는 장비이다. 
- IP를 우회할 수 있기 때문에 방화벽 단독으로는 보안이 약하다. 따라서 IPS, IDS, WAF(Web Application Firewall) 등을 추가적으로 사용한다.

**IPS(Instrusion Prevention System, 침입 방지 시스템)**
![[Pasted image 20251229155456.png]]

- 방화벽과 비슷하게 들어오는 트래픽을 시그니처, 이상 징후 기반 탐지패턴으로 탐지하고 차단한다.
- 실제 통신 경로에 위치한다.

**IDS(Instrusion Detection System, 침입 탐지 시스템)**
![[Pasted image 20251229160635.png]]

- 트래픽이나 로그를 시그니처, 이상 행위 기반 탐지패턴으로 탐지하고 경보를 생성한다.
- 보통 통신 경로가 아니라 미러링이나 로그 기반으로 분석한다.

**IPS, IDS 차이**
- IPS, IDS 둘 다 트래픽의 시그니처와 이상 징후 기반의 탐지패턴으로 공격을 탐지하지만 IPS는 직접 해당 트래픽을 차단하고 IDS는 경보만 생성한다.