# StaffMap
Automation of small business management. StaffMap automates at the initial stage several industries at once: 
- **staff management**
- **resource control**
- **Automatic salary payments**
- **Managing many locations at once**

Now this project haven't all functions which was descripted here. But our team working everyday for that project. WAIT FOR RELESE!!!

## Stack
NestJS![NestJS](https://img.icons8.com/?size=100&id=9ESZMOeUioJS&format=png&color=000000)
PostgreSQL ![PostgreSQL](https://img.icons8.com/?size=100&id=38561&format=png&color=000000)
TypeORM ![TypeORM](https://assets.streamlinehq.com/image/private/w_100,h_100,ar_1/f_auto/v1/icons/logos/typeorm-cu31gajopxrlcowqr0hsn.png/typeorm-if5g7i7y2l9bodc4iwe6c.png?_a=DAJFJtWIZAAC)
pnpm ![pnpm](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABOFJREFUeF7tnV9S2zAQxldKpx1O0XCS0gMkpMP0ueQklJMQnjstITkAcJLmFnQ6jd2sawUh/GdXY3mI++XRWa/s3yd/Wsl2Yqjnz68fdGdyOknQ7OLdGc0fb2hsM/qZID8ZovnbM1r8/k7nOdFVojZSpK3PCUGaeZt+5SCCIBCksz4Hy9KhxBii4/UvGpYFy4rpN5X7wLJ0KGFZOl6wLAkvlL0SSmUMLEsBi4hgWTpesCwJL1iWhBIsS0HpKRSWFYMNE0NMDGP6DSaGHVCDZcVAhGXBsmL6DSyrA2qwrBiIsCxYVky/gWV1QA2WFQMRlgXLiuk3sKwOqMGyYiDCsmBZMf0GltUBNVhWDERYFiwrpt/8P5b1+C3JqwhEb2hz9Ik2TDJVG0ef6b7If0Nj+kPjzpT2EvV+Tz3FSQwpJwR5ZWoOTpDZbDbebrdJ3m4iouv1er1gSzQjukih5SAFybIsyStteZ7PWZBBvdKWolf5OfkKgSCpKSvyQxAFrD5CIUgflBVtQBAFrD5CIUgflBVtQBAFrD5CByPIZDI5N8a8Z2jW2gci2iyXy2JtKPyUk68Ta+2HPM83HL9cLot1nvATk5ePwz+G2Wx2st1ux257XVvc9sEL4ma2xpjw90cY9Dw8+dPT06udCOcV7L+uVqtLt72LvHme31trN2F7xpjF7e3tvK6zHPQ8pAFwcb7W2mN3pbTFupks79cWq8lbY3XPOoDfEQ5akOl0mjd5u98b22K5R6/X64+cry1Wk7fq+Py2/O8P3rJ8cDvfZphsERe+Tbje7Me6q2G3jRfZvpZQNqvV6jgUJDIvr0cV9xwc/Lq2hixIYU88iGZZdudOlIHyWBKKx9vC2N04UixYBrHqvL7luauprq3BC1IC9XtoscpZI8izxbwmQTR5IUgwgNfY0368cVdN6NkCQfY5PNt7kReCeIKEkFssS3yFaPJCEE+QcjK3v+vWlSCavBCkrGbY54NJYm3lVA7qrVcIV0navBCkfjKyn4DFDuptE7uqvBCkglo4+ZpOp/vKy9lYWOJWDephakle3968srfyahxs2cuTwtJaCosJ14sYEhF94fUlY8ylW1Lxt7t9gpm6Oq9bC+O2six74LK7FJ8nrbywualazxrcTL1pJbVpiSX8rsqGNPvHxkKQGnIQJK5LmbpxIS7d016p8rYd18FfIZPJ5M6Vuf5A3Xbibd+nytvW7sELwifIi3ZNdwjbINR9nypv0/EMQpBY4K9xPwjyylSBIBCkUwKDe/rdTR47pVQm2905vebJML+OYC19SNHGIAVJAaqvnBCkL9LCdnoXxD30Jjw+cdhoNOIH+/geP79BleI/rmg0Gt2Xzxwka6N3QfwJo5i2ILBuRViwqzjE3XIOb7SJEwgCIYgAkguBIApYuEIUsPxQWFYzOFiWomPBshSwYFkKWLAsOSxYlpwVP/RdPFKLslcADZYlgFQVgioLVVZk13m5GyxLgRKWpYCFKksOC1WWnBWqLAUrfmK/eFW6j3vqKHsFykAQASSUvXpIGEMUzFD2KmDBshSwUPbKYcGy5KxQ9ipYoezVwIJlyWnBsuSsYFkKVrAsDSxYlpwWLEvOCpalYAXL0sCCZclpwbLkrAZtWSn+v2nBP1Nb3g/Z/zyhgndrqPvZ3PJ+SJI/dPkL3KiH+MzojP4AAAAASUVORK5CYII=)


## Project setup
```bash
$ pnpm install
```

## Create file .env

create .env file using example .example.env

## Start Docker containers
```bash
$ docker compose up -d
```

## Compile and run the project (local)

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```