import { AuthUseCase } from "./auth.use-case"
import { ConfigService } from "@nestjs/config"
import { AppEnums } from "src/shared/enums"
import { AppConfigType } from "src/infra/app-config/types"
import { Test } from "@nestjs/testing"
import { classes } from '@automapper/classes';
import { AutomapperModule } from "@automapper/nestjs"
import { JwtModule } from "@nestjs/jwt"
import { UserService } from "src/core/users/services"

describe("AuthUseCase", async () => {
  const userService = { findByEmail: jest.fn(), createUser: jest.fn()}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let authUseCase: AuthUseCase
  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            const { jwtSecret: secret } = configService.getOrThrow<AppConfigType>(
              AppEnums.ConfigTypeEnum.APP,
            );
            return {
              secret,
              signOptions: { expiresIn: '30d' },
            };
          },
          inject: [ConfigService],
          global: true,
        }),
      ],
    }).overrideProvider(UserService).useValue(userService).compile()
  
    authUseCase = moduleRef.get(AuthUseCase)
  })
  
  describe("createUser", () => {
    test("User creaates", async () => {
      userService.findByEmail.mockResolvedValueOnce(undefined)
      
      // @ts-ignore
      const r = await authUseCase.createUser({email: ""}) as any

      expect(
        userService.createUser
      ).toHaveBeenCalled()
    })
  })
})