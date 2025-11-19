---
description: "AWS와 상호 작용: AWS Management Console, AWS CLI, AWS SDK"
tags:
  - AWS
  - Cloud
date: 2025-11-17
modified: 2025-11-17
draft: true
stage:
  - 1차 퇴고
---
인프라를 물리적으로 관리하는 대신 AWS에서는 API를 통해 논리적으로 관리한다. 따라서 AWS에서 수행하는 모든 작업은 인증 및 권한이 부여된 API를 직접 호출한다.
AWS에서는 AWS Management Console, AWS Command Line Interface(AWS CLI) 또는 AWS SDK를 통해서 서비스 및 리소스에 대한 API 호출을 수행할 수 있다.

## AWS Management Console
![[image.png]]
클라우드 리소스를 관리하는 한 가지 방법은 브라우저에서 로그인한 후 웹 기반 콘솔을 사용하는 것이다. 위 사진은 콘솔에 로그인한 랜딩 페이지의 스크린 샷이다. 이 콘솔의 장점은 마우스를 이용하여 조작할 수 있다는 것이다. 클릭하고 프롬프트를 따라 하기만 하면 서비스에 대한 사전 지식이 없는 사람도 서비스를 구축할 수 있다.
왼쪽 상단의 서비스 버튼을 선택하여 컴퓨팅, 스토리지, 데이터베이스, 분석 등의 범주로 그룹화된 AWS 서비스를 볼 수 있다.
오른쪽 상단에는 리전을 선택할 수 있다. 리전을 선택하고 변경하면 선택한 리전의 서비스에 요청을 보내며 URL도 변경된다.

## AWS CLI
AWS Management Console만 사용하여 AWS 서비스를 충분히 구성할 수 있지만 번거로울 수 있다. 가상 머신을 생성할 때 여러 개의 화면과 많은 프롬프트를 읽어서 생성해야 하고 다음 가상머신을 생성하려면 같은 작업을 똑같이 반복해야 한다. 이러한 부분은 번거롭기도하고 오타나 중요한 설정을 빼먹는 등 사용자가 실수할 가능성도 있다.
이러한 위험을 관리하기 위해 API 호출을 스크립팅하거나 프로그래밍할 수 있는 도구를 사용할 수 있다. AWS CLI는 이러한 도구 중 하나이다.
AWS CLI를 사용하기 위해서는 Windows, Linux, macOS에 설치 관리자를 이용하여 AWS CLI를 다운로드해야 한다.

![[image 2.png]]
또는 AWS Management Console에서 오른쪽 상단 메뉴의 가장 왼쪽 버튼을 누르면 CloudShell을 실행할 수 있다. CloudShell에는 AWS CLI가 기본적으로 설치되어 있다.

두 옵션 모두 AWS 구문을 사용하여 AWS를 조작할 수 있다.

## AWS SDK
프로그래밍 언어로 코드를 실행하여 AWS의 API를 호출할 수 있다. 이를 위해서 AWS SDK를 사용한다. SDK는 오픈 소스이며, C++, Go, Java, JavaScript, .NET, Node.js, PHP, Python, Ruby, Swift 등과 같은 널리 사용되는 프로그래밍 언어에 대해 AWS가 유지 관리한다.

---
## Reference
- AWS Skill Builder, "AWS Techincal Essentials"