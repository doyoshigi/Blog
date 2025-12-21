---
description: AWS Organizations
tags:
  - AWS
date: 2025-12-13
modified: 2025-12-21
draft: false
---
## AWS Organizations란?
![[Pasted image 20251213222454.png]]

AWS Organizations이란 AWS에서 계정을 집단으로 관리할 수 있는 서비스이다.
AWS Organizations를 사용하면 AWS 계정에 대한 정책 설정 및 여러 계정에 대한 단일 통합 청구서를 이용할 수 있다. 기업에서 업무를 계정단위로 환경을 관리할 때 유용하다.(예: 개발용 계정, 보안용 계정 등 으로 나눌 때)

## OU(Organizational Unit)
AWS 계정은 OU(Organizational Unit, 조직)라는 단위로 그룹화하여 관리할 수 있으며 여러 계정이 OU에 포함될 수 있다. AWS 계정에서 처음 AWS Organizations를 활성화하면 기본적으로 Root(최상위 조직)가 생성되며 Organizations을 활성화한 계정이 Management Account(관리 계정)이 된다.

## 계정 추가
AWS Organizations에서 AWS 계정을 생성하거나 기존의 AWS 계정을 초대하여 Organizations에 추가한 다음 OU에 배치할 수 있습니다. 

## Policy
OU나 AWS 계정에는 여러가지 정책을 설정할 수 있는데 루트나 OU에 연결된 정책은 해당 지점 아래의 모든 하위 OU와 게정에 적용됩니다.

이 글에서는 여러 정책 중 SCP(Service Control Policy)와 RCP(Resource Control Policy)를 알아보도록 하겠다.
### SCP(Service Control Policy) 
SCP는 AWS 계정의 IAM 사용자/역할이 행사할 수 있는 최대 권한을 설정한다. SCP는 권한을 부여하지 않으며, 단지 가능한 것을 제한할 뿐이다. IAM 또는 Identify Center 권한 세트가 어떤 작업을 허용 하더라도, SCP의 명시적 거부가 이를 우선한다.

### RCP(Resource Control Policy)
RCP는 조직 계정의 리소스에 액세스할 수 있는 방식에 대한 경계를 설정하며, 일반적으로 조직 외부의 보안 주체에 의한 액세스를 제한하는 데 사용된다. SCP와 마찬가지로 RCP는 가드레일이다. 즉, 권한을 부여하지 않으며, 리소스 정책에 의해 허용되는 접근이라도 액세스를 제한한다.

SCP와 RCP의 경계를 다시 정리하면 아래와 같다.
- **SCP = 보안 주체(Identity) 측 경계 (IAM 보안 주체)**
- **RCP = 리소스 측 경계 (리소스 액세스, 특히 조직 외부로부터의 액세스)**

### 가드레일(Guardrail)
가드레일은 문장으로 정의한 개념적인 정책(규칙)이고 실제로 그것을 구현하는 것이 SCP나 RCP 등의 정책이다.

## 통합 결제(Consolidated billing)
![[Pasted image 20251214000518.png]]
AWS Oragnizations에서 조직화한 구조대로 계정별 요금 정보를 "Billing and Cost Management(결제 및 비용 관리)콘솔"에서 확인할 수 있다. 

---

## Reference
- https://docs.aws.amazon.com/ko_kr/organizations/latest/userguide/orgs_manage_ous.html