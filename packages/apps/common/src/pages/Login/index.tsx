import styles from "./index.module.scss";
import React, { useCallback } from "react";
import { Button, Divider, Image, Input, Text } from "react-ck";
import { AuthLayout } from "../../components/AuthLayout";
import logo from "../../../assets/logo.svg";
import { Link, generatePath } from "react-router-dom";
import { routesList } from "../../routes/routes-list";

const chatLink = <Link to={generatePath(routesList.chat)} />;

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

    <Button fullWidth as={chatLink}>
      Log In
    </Button>

    <Divider />

    <Button fullWidth skin="secondary" as={chatLink}>
      Continue with Google
    </Button>
    <Button fullWidth skin="secondary" as={chatLink}>
      Continue with Microsoft
    </Button>

    <Text className={styles.note}>Restricted, if not invited, disregard</Text>
  </AuthLayout>
);
