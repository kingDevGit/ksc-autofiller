/* eslint-disable @typescript-eslint/no-misused-promises */
/*global chrome*/
/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStyles } from "./CourseEnrollPage.styles";
import { Button, Input, Label, Select } from "@fluentui/react-components";
import { ApiResponse } from "../../types/ApiResponse";
import { Message } from "../../types/Message";
import { getLocalStorage, setLocalStorage } from "../../chromeServices/storage";
import { Profile } from "../../types/PersonalData";
import LokkyHeadComponent from "../../components/lokky-head/LokkyHeadComponent";
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE_ROUTE } from "../MainPage/MainPage";
import PathRecordComponent from "../../components/path-record/PathRecordComponent";

export const COURSE_ENROLL_ROUTE = "/course-enroll";

const enrollUrlPattern =
  /www\.kscgolf\.org\.hk\/learn\/adults-programme\/student-enrolment|www\.kscgolf\.org.hk\/chi\/learn\/adults-programme\/student-enrolment/;

const CourseEnrollPage: React.VFC = React.memo(() => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [currentUrl, setCurrentUrl] = useState("");

  const [name, setName] = useState("");
  const [chiName, setChiName] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("Mr.");

  const [profileId, setProfileId] = useState(1);

  const isAutoFillButtonShown = useMemo(() => {
    console.log("REGEX", enrollUrlPattern.test(currentUrl));
    return enrollUrlPattern.test(currentUrl);
  }, [currentUrl]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (chrome.tabs) {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          if (tabs[0]) {
            setCurrentUrl(tabs[0].url ?? "");
          } else {
            setCurrentUrl("");
          }
        }
      );
    }
  });

  const saveProfile = useCallback(async () => {
    const data = {
      name,
      chiName,
      phone,
      fax,
      email,
      title,
    };

    await setLocalStorage(`PROFILE_${profileId}`, JSON.stringify(data));
    alert(`Saved PROFILE_${profileId}`);
  }, [chiName, email, fax, name, phone, profileId, title]);

  const loadProfile = useCallback(async (profileId: number) => {
    const data = await getLocalStorage(`PROFILE_${profileId}`);
    console.log("Loaded Profile", data);
    if (data[`PROFILE_${profileId}`]) {
      const parsedData = JSON.parse(data[`PROFILE_${profileId}`]) as Profile;
      console.log("Parsed Profile", parsedData);
      setName(parsedData.name ?? "");
      setChiName(parsedData.chiName ?? "");
      setEmail(parsedData.email ?? "");
      setFax(parsedData.fax ?? "");
      setPhone(parsedData.phone ?? "");
      setTitle(parsedData.title ?? "Mr.");
    } else {
      setName("");
      setChiName("");
      setEmail("");
      setFax("");
      setPhone("");
      setTitle("Mr.");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadProfile(profileId)
      .then(() => {})
      .catch((err: unknown) => {
        console.log(err);
      });
  }, [loadProfile, profileId]);

  const onAutoFillClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (chrome.tabs) {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          /**
           * Sends a single message to the content script(s) in the specified tab,
           * with an optional callback to run when a response is sent back.
           *
           * The runtime.onMessage event is fired in each content script running
           * in the specified tab for the current extension.
           */
          chrome.tabs
            .sendMessage(tabs[0].id ?? 0, {
              type: "FILL",
              data: {
                name,
                chiName,
                email,
                phone,
                fax,
                title,
              } as Profile,
            } as Message)
            .then((response: ApiResponse) => {
              console.log("Filled", response);
            })
            .catch((e: unknown) => {
              console.log("[TABS QUERY] Error:", e);
            });
        }
      );
    }
  }, [chiName, email, fax, name, phone, title]);

  const inputEle = useMemo(() => {
    return (
      <>
        <Label>稱呼</Label>
        <Select
          defaultValue="Mr"
          className={styles.select}
          value={title}
          onChange={(_ev, data) => setTitle(data.value)}
        >
          <option value={"Mr."}>先生</option>
          <option value={"Ms."}>女士</option>
          <option value={"Mrs."}>太太</option>
        </Select>

        <div className={styles.textInput}>
          <Label>姓名</Label>
          <Input
            value={name}
            onChange={(_event, data) => {
              setName(data.value);
            }}
          />
        </div>

        <div className={styles.textInput}>
          <Label>中文姓名</Label>
          <Input
            value={chiName}
            onChange={(_event, data) => {
              setChiName(data.value);
            }}
          />
        </div>
        <div className={styles.textInput}>
          <Label>電話</Label>
          <Input
            value={phone}
            onChange={(_event, data) => {
              setPhone(data.value);
            }}
          />
        </div>
        <div className={styles.textInput}>
          <Label>傳真</Label>
          <Input
            value={fax}
            onChange={(_event, data) => {
              setFax(data.value);
            }}
          />
        </div>
        <div className={styles.textInput}>
          <Label>Email</Label>
          <Input
            value={email}
            type="email"
            onChange={(_event, data) => {
              setEmail(data.value);
            }}
          />
        </div>
        <Button
          className={styles.button}
          appearance="primary"
          onClick={saveProfile}
        >
          儲存
        </Button>
        {isAutoFillButtonShown ? (
          <Button
            className={styles.button}
            appearance="secondary"
            onClick={onAutoFillClick}
          >
            填FORM!
          </Button>
        ) : null}
      </>
    );
  }, [
    chiName,
    email,
    fax,
    isAutoFillButtonShown,
    name,
    onAutoFillClick,
    phone,
    saveProfile,
    styles.button,
    styles.select,
    styles.textInput,
    title,
  ]);

  const goProgrammeLists = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (chrome.tabs) {
      chrome.tabs
        .create({
          url: `https://www.kscgolf.org.hk/learn/adults-programme/`,
        })
        .then(() => {})
        .catch((e: unknown) => {
          console.log("Error:", e);
        });

      // ALTERNATIVE WAY: Using redirect method.
      // chrome.tabs.query(
      //   {
      //     active: true,
      //     currentWindow: true,
      //   },
      //   (tabs) => {
      //     /**
      //      * Sends a single message to the content script(s) in the specified tab,
      //      * with an optional callback to run when a response is sent back.
      //      *
      //      * The runtime.onMessage event is fired in each content script running
      //      * in the specified tab for the current extension.
      //      */
      //     chrome.tabs.sendMessage(
      //       tabs[0].id ?? 0,
      //       { type: "REDIRECT" } as Message,
      //       (response: ApiResponse) => {
      //         console.log(response);
      //       }
      //     );
      //   }
      // );
    }
  }, []);

  return (
    <div className={styles.root}>
      <PathRecordComponent />
      <div className={styles.headerBar}>
        <Button
          appearance="primary"
          className={styles.button}
          onClick={() => navigate(MAIN_PAGE_ROUTE)}
        >
          回到主頁
        </Button>

        <Button
          appearance="primary"
          className={styles.button}
          onClick={goProgrammeLists}
        >
          跳到課程列表
        </Button>

        <LokkyHeadComponent />
      </div>

      <label>ID</label>
      <Select
        defaultValue="1"
        className={styles.select}
        onChange={(_ev, data) => setProfileId(parseInt(data.value, 10))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </Select>

      {inputEle}
    </div>
  );
});

export default CourseEnrollPage;
