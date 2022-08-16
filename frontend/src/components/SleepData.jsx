import {
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useDispatch } from "react-redux";

import AddEntry from "./AddEntry";
import ToggleSwitch from "./ToggleSwitch";
import {
  deleteSleepEntry,
  getSleepEntries,
  // getSleepEntries,
} from "../features/sleep/sleepSlice";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  pointBackgroundColor: "black",
  pointBorderColor: "white",
  pointRadius: 4,
};

export const customDataFormat = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getTotalSleepDuration = (sleepTime, wakeUpTime) => {
  const sleepTimeDate = new Date(`01/01/1970 ${sleepTime}`);
  const wakeUpTimeDate = new Date(`01/02/1970 ${wakeUpTime} `);
  return (Math.abs(wakeUpTimeDate - sleepTimeDate) / 36e5).toFixed(2);
};

const SleepData = ({ sleepdata }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  let labels, dataSetsData;

  if (sleepdata && sleepdata.length > 0) {
    labels = [
      ...sleepdata.map((sleep) => {
        const date = new Date(sleep.date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day}/${month}`;
      }),
    ].reverse();

    dataSetsData = [
      ...sleepdata.map((sleep) => {
        const sleeptime = sleep.sleepTime;
        const wakeuptime = sleep.wakeUpTime;
        return getTotalSleepDuration(sleeptime, wakeuptime);
      }),
    ].reverse();
  }

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dataSetsData,
        fill: true,
        lineTension: 0.4,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <AddEntry onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mt={10}
      >
        <Text fontSize="6xl" fontWeight={"800"}>
          Dashboard
        </Text>
        <Button mt={5} onClick={onOpen}>
          New Entry
        </Button>
        {!sleepdata || sleepdata.length <= 0 ? (
          <Text fontWeight={"700"} fontSize="5xl" mt={10}>
            No records available.
          </Text>
        ) : (
          <>
            <ToggleSwitch />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              flexDirection={"row"}
              mt={20}
              sx={{
                "@media screen and (max-width:950px)": {
                  flexDirection: "column",

                  h: "fit-content",
                },
              }}
            >
              <Box
                width={"48%"}
                sx={{
                  "@media screen and (max-width:1250px)": {
                    h: "auto",
                    w: "450px",
                  },
                  "@media screen and (max-width:950px)": {
                    mt: 18,
                    w: "600px",
                  },
                  "@media screen and (max-width:550px)": {
                    w: "700px",
                  },
                }}
              >
                <Line data={data} options={options} />
              </Box>

              <TableContainer
                // border={"1px solid lightgrey"}
                // borderRadius={"10px"}
                // padding={"2em 0 2em 0"}
                ml={20}
                overflow={"hidden"}
                sx={{
                  "@media screen and (max-width:1250px)": {
                    h: "300px",
                    w: "400px",
                    overflow: "scroll",
                  },
                  "@media screen and (max-width:950px)": {
                    mt: 20,
                    w: "700px",
                    h: "800px",
                  },
                  "@media screen and (max-width:550px)": {
                    w: "800px",
                    h: "900px",
                  },
                }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Time of sleep</Th>
                      <Th>Wake up time</Th>
                      <Th>Sleep duration</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sleepdata.length > 0 &&
                      sleepdata.map((sleep) => {
                        return (
                          <Tr key={sleep._id}>
                            <Td>{customDataFormat(sleep.date)}</Td>
                            <Td>{sleep.sleepTime}</Td>
                            <Td>{sleep.wakeUpTime}</Td>
                            <Td>
                              {getTotalSleepDuration(
                                sleep.sleepTime,
                                sleep.wakeUpTime
                              )}{" "}
                              hours
                            </Td>
                            <Td _hover={{ cursor: "pointer" }}>
                              <DeleteIcon
                                _hover={{ color: "red" }}
                                onClick={() => {
                                  dispatch(deleteSleepEntry(sleep._id));
                                }}
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SleepData;
