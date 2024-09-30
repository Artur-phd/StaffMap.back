import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyMainUseCase } from "../use-cases";


@ApiTags('company')
@Controller('company')
export class CompanyHttpController {
    constructor(private readonly companyUseCase: CompanyMainUseCase) {}

    @Get()
    public getInoCompany() {
        return this.companyUseCase.getInfo()
    }
}