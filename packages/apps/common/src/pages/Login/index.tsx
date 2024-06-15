import styles from "./index.module.scss";
import React from "react";
import { Button, Divider, Image, Input, Text } from "react-ck";
import { AuthLayout } from "../../components/AuthLayout";
import logo from "../../../assets/logo.svg";

export const LoginPage = (): React.ReactElement => (
  <AuthLayout>
    <Image className={styles.logo} src={logo} alt="Company logo" />

    <Text variation="h1" margin="bottom">
      Sign in to Company
    </Text>

    <Input
      skin="negative"
      label="Email"
      description="Email not found. Please try again."
      placeholder="email@company.com"
    />

    <Button fullWidth>Log In</Button>

    <Divider />

    <Button fullWidth skin="secondary">
      Continue with Google
    </Button>
    <Button fullWidth skin="secondary">
      Continue with Microsoft
    </Button>

    <Text className={styles.note}>Restricted, if not invited, disregard</Text>
  </AuthLayout>
);
