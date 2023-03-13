## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Docker build

```docker
docker build --tag parking-api .
docker compose-up

หลังจาก ติดตั่งเสร็จ ให้ นำไฟล์ migration script ไปรันใน DB
```

## Step 1

```
  สร้างลานจอดรถ
 create parking-lot
 POST : >> api/v1.0/parking-app-parking-lots
```

## Step 2

```
  สร้าง บล็อคจอดรถ 1 ลานจอดอาจจะมีหลายบล็อคตามขนาด smaill,medium,large
 create block
 POST : >> api/v1.0/parking-app-blocks
```

## Step 3

```
  สร้าง ชั้น ลานจอดรถก็จะมี บล็อคตามขนาด และมีชั้น แต่ละชั้นก็จะมีบล็อคตามที่เราสร้างไว้
 create parking-lot
 POST : >> api/v1.0/parking-app-floors
```

## Step 4

```
 สร้าง slot ตามชั้นที่สร้างไว้ และ ตามบล็อค แต่ละบล็อคอยากให้มีช่องจอดกี่ช่องก็ใส่ไปที่ numberOfSlot ได้เลย
 create parking-lot
 POST : >> api/v1.0/parking-app-slots
```

## Step 5

```
  เมื่อสร้างที่จอดเสร็จ เริ่ม check-in ได้เลย
 create parking-lot
 POST : >> api/v1.0/customer-app-reservations/check-in
```

## Step 6

```
 เมื่อจะออกจากลานจอดรถ เริ่ม check-out ได้เลย
 create parking-lot
 POST : >> api/v1.0/customer-app-reservations/check-out
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
