import { selectIsLoggedIn, selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/features/features/auth/lib/schemas"
import { LoginInputs } from "@/features/features/auth/lib/schemas/loginSchema.ts"

import { Navigate } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import { useGetCaptchaQuery, useLoginMutation } from "@/features/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { useState } from "react"

export const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const [login] = useLoginMutation()

  const [showCaptcha, setShowCaptcha] = useState(false)
  const { data: captchaData, refetch } = useGetCaptchaQuery(undefined, {
    skip: !showCaptcha,
  })

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const res = await login(data)
    const result = "data" in res ? res.data : undefined

    if (result?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      localStorage.setItem(AUTH_TOKEN, result.data.token)
      reset()
    }
    if (result?.resultCode === ResultCode.CaptchaError) {
      setShowCaptcha(true)
      refetch()
    }
  }

  if (isLoggedIn) {
    return <Navigate to={Path.Main} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                  )}
                />
              }
            />
            {showCaptcha && captchaData?.url && (
              <>
                <img src={captchaData.url} alt="captcha" style={{ marginTop: "1rem" }} />
                <TextField label="Enter captcha" margin="normal" error={!!errors.captcha} {...register("captcha")} />
                {errors.captcha && <span className={styles.errorMessage}>{errors.captcha.message}</span>}
              </>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
