import { Injectable } from "@nestjs/common";

@Injectable()
export class CompanyMainService {

    public reInformer(message: string) {
        return message + ' переделаное сообщение'
    }
}