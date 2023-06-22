import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Reports } from "./Reports";
import { Maths } from "./Maths";
import { English } from "./English";
import { Science } from "./Science";
import { GK } from "./GK";

export const NavigationBar = () => {
  return (
    <section>
      <Tabs isFitted variant={"soft-rounded"}>
        <TabPanels>
          <TabPanel p={0} m={0}>
            <Reports />
          </TabPanel>
          <TabPanel p={0} m={0}>
            <Maths />
          </TabPanel>
          <TabPanel p={0} m={0}>
            <English />
          </TabPanel>
          <TabPanel p={0} m={0}>
            <Science />
          </TabPanel>
          <TabPanel p={0} m={0}>
            <GK />
          </TabPanel>
        </TabPanels>
        <TabList
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            background: "white",
          }}
        >
          <Tab
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                color: "#009ad6",
              }}
              class="material-symbols-outlined"
            >
              school
            </span>
            <small>Overall</small>
          </Tab>
          <Tab
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                color: "#009ad6",
              }}
              class="material-symbols-outlined"
            >
              calculate
            </span>
            <small>Math</small>
          </Tab>
          <Tab
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                fontSize: "30px",
                color: "#009ad6",
              }}
              class="material-symbols-outlined"
            >
              abc
            </span>
            <small>English</small>
          </Tab>
          <Tab
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                color: "#009ad6",
              }}
              class="material-symbols-outlined"
            >
              science
            </span>
            <small>Science</small>
          </Tab>
          <Tab
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                color: "#009ad6",
              }}
              class="material-symbols-outlined"
            >
              psychology
            </span>
            <small>GK</small>
          </Tab>
        </TabList>
      </Tabs>
    </section>
  );
};
