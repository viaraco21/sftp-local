VERSION:=$(shell cat VERSION)
GITCOMMIT := $(shell git rev-parse --short=8 HEAD)
BRANCH_NAME ?= $(shell git rev-parse --abbrev-ref HEAD)

ifneq ($(BRANCH_NAME),master)
	VERSION := ${VERSION}-${GITCOMMIT}
endif

build:
	sed -i "s/version\:.*/version: ${VERSION}/g" chart/Chart.yaml
	sed -i "s/version\:.*/version: ${VERSION}/g" chart/values.yaml

	docker build ./app -f ./app/Dockerfile -t docker.totvs.io/renato.cerqueira/sftp-users:${VERSION}

push:
	docker login https://docker.totvs.io -u ${HARBOUR_USER} -p ${HARBOUR_PASS}
	docker push docker.totvs.io/renato.cerqueira/sftp-users:${VERSION}
