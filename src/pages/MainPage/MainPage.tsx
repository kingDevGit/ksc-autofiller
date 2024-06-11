/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { useStyles } from "./MainPage.styles";
import { Button, Text } from "@fluentui/react-components";
import LokkyHeadComponent from "../../components/lokky-head/LokkyHeadComponent";
import { useNavigate } from "react-router-dom";
import { COURSE_ENROLL_ROUTE } from "../CourseEnroll/CourseEnrollPage";
import PathRecordComponent from "../../components/path-record/PathRecordComponent";

export const MAIN_PAGE_ROUTE = "/home";

const MainPage: React.VFC = React.memo(() => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <PathRecordComponent />
      <div className={styles.headerBar}>
        <Text>LL Sponsor Club 工具</Text>

        <LokkyHeadComponent />
      </div>

      <div>
        <Button
          appearance="primary"
          size="large"
          className={styles.button}
          onClick={() => navigate(COURSE_ENROLL_ROUTE)}
        >
          我要報班
        </Button>

        <Button appearance="primary" size="large" className={styles.button}>
          我要打波
        </Button>
      </div>
    </div>
  );
});

export default MainPage;
