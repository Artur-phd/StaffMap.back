import { CompanyHttpController } from "./controllers";
import { CompanyMainUseCase } from "./use-cases";

export const companyControllers = [CompanyHttpController]

export const companyProviders = [
    CompanyMainUseCase
]

