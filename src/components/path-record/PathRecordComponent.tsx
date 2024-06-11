import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../../chromeServices/storage";

const PathRecordComponent: React.VFC = React.memo(() => {
  const location = useLocation();

  const handleRedirect = async () => {
    const status = await getLocalStorage("PLUGIN_STATUS");
    const routerPath = await getLocalStorage("ROUTER_PATH");

    if (status["PLUGIN_STATUS"]) {
      const parsedStatus = JSON.parse(status["PLUGIN_STATUS"]);

      if (parsedStatus.isInit) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`Recorded Path ${location.pathname}`);
        setLocalStorage(`ROUTER_PATH`, location.pathname)
          .then(() => {})
          .catch(() => {});
        // TODO: Handle saved path
      } else {
        const parsedPath = JSON.parse(routerPath["ROUTER_PATH"]);
        if (parsedPath) {
        }
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleRedirect();
  }, [location.pathname]);

  return <></>;
});

export default PathRecordComponent;
