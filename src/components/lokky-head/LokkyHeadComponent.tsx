import React, { useMemo } from "react";
import { useStyles } from "./LokkyHeadComponent.styles";
import { Tooltip, Image } from "@fluentui/react-components";

const QUOTE_LIST = [
  "有冇練波？",
  "教精你啦！",
  "唔好打比呀姐。",
  "打埋呢隻完喇！",
  "我滘西Lokky",
  "Release 得太早",
  "唔洗望波，你唔打得幾遠。",
  "早晨，27號有比賽，如果改28號o唔ok？",
];

const LokkyHeadComponent: React.VFC = React.memo(() => {
  const styles = useStyles();

  const randomQuoteFromLL = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * QUOTE_LIST.length);
    return QUOTE_LIST[randomIndex];
  }, []);

  return (
    <div>
      <div className={styles.imageContainer}>
        <Tooltip
          content={randomQuoteFromLL}
          relationship="description"
          visible={true}
          withArrow={true}
          positioning={"before-top"}
        >
          <Image src="./lokky.jpg" fit="contain" shape="circular" />
        </Tooltip>
      </div>
    </div>
  );
});

export default LokkyHeadComponent;
