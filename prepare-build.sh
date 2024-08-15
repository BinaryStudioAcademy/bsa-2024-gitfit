#!/bin/bash

mkdir -p ./apps/build/backend; mv ./apps/backend/build/* ./apps/build/backend
mkdir ./apps/build/backend/public; mv ./apps/frontend/build/* ./apps/build/backend/public
cp ./apps/backend/package.json ./apps/build/backend
cp package.json package-lock.json ./apps/build
