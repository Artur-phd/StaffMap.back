import { Module } from "@nestjs/common";
import { companyControllers, companyProviders } from "src/api/company";

@Module({
    controllers: companyControllers,
    providers: companyProviders,
    exports: companyProviders,
})

export class CompanyApiModule {}