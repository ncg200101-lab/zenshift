import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/layouts/DashboardHeader";
import Footer from "../components/layouts/Footer";
import { Typography, Text } from "../components/ui/Text";
import ExplosionEffect from "../components/ui/ExplosionEffect";

const purchaseHistory = [
  {
    productName: "Advance Chakra Meditation",
    date: "12/5/2024",
    type: "Audio",
  },
  {
    productName: "Advance Chakra Meditation",
    date: "12/5/2024",
    type: "Audio",
  },
  {
    productName: "Advance Chakra Meditation",
    date: "12/5/2024",
    type: "Audio",
  },
  {
    productName: "Advance Chakra Meditation",
    date: "12/5/2024",
    type: "Audio",
  },
];

const DashboardPage = () => {
  const membership = {
    status: "active",
  };

  const navigate = useNavigate();

  return (
    <>
      <DashboardHeader />
      <div className="bg-white">
        <div className="container pt-12 md:pt-24 pb-12">
          <div className="mb-12">
            <Typography className="font-playfair text-left">
              <i>Hi John Doe</i>
            </Typography>
            <Text className="text-gray-700">
              Manage your zenShift Journey and access your personalized content
            </Text>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-lato sm:text-2xl text-[#616161] font-semibold flex items-center gap-x-2">
                    <span className="text-[#FFCD29]">
                      <svg
                        width="46"
                        height="34"
                        viewBox="0 0 46 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.5973 17C29.3826 17 28.2398 16.3531 27.6217 15.3181L23.0001 7.65625L18.3857 15.3181C17.7604 16.3603 16.6176 17.0072 15.4029 17.0072C15.0795 17.0072 14.7561 16.9641 14.447 16.8706L4.60011 14.0531V26.8469C4.60011 27.9034 5.31886 28.8234 6.33949 29.075L21.8789 32.9634C22.612 33.1431 23.3811 33.1431 24.107 32.9634L39.6607 29.075C40.6814 28.8162 41.4001 27.8962 41.4001 26.8469V14.0531L31.5532 16.8634C31.2442 16.9569 30.9207 17 30.5973 17ZM45.8779 8.93562L42.1764 1.54687C41.9535 1.10125 41.472 0.842496 40.976 0.907183L23.0001 3.2L29.5911 14.1322C29.8642 14.585 30.4104 14.8006 30.9207 14.6569L45.1448 10.5959C45.8564 10.3875 46.2014 9.59687 45.8779 8.93562ZM3.82386 1.54687L0.1223 8.93562C-0.208325 9.59687 0.143862 10.3875 0.848238 10.5887L15.0723 14.6497C15.5826 14.7934 16.1289 14.5778 16.402 14.125L23.0001 3.2L5.01699 0.907183C4.52105 0.849683 4.04667 1.10125 3.82386 1.54687Z"
                          fill="#FFCD29"
                        />
                      </svg>
                    </span>
                    <span>My Purchase</span>
                  </h2>
                  <button className="text-[#763AF5] text-lg sm:text-xl hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-lg gap-4 p-4"
                    >
                      <div>
                        <h3 className="text-xl sm:text-2xl font-lato font-medium">
                          {purchase.productName}
                        </h3>
                        <p className="text-base sm:text-xl font-lato text-[#808080]">
                          {purchase.type} • Purchased on {purchase.date}
                        </p>
                      </div>
                      <button className="flex items-center border border-[#D9D9D9] text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200">
                        <span className="font-lato">Access</span>
                        <span className="ml-2">
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 7.40192C18.5 8.55662 18.5 11.4434 16.5 12.5981L4.5 19.5263C2.5 20.681 0 19.2376 0 16.9282V3.07179C0 0.762393 2.5 -0.68098 4.5 0.473721L16.5 7.40192Z"
                              fill="#D9D9D9"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6 }}
              >
                <ExplosionEffect className="w-full">
                  <button className="relative w-full quad-gradient text-white text-xl md:text-2xl font-lato py-4 rounded-xl font-semibold cursor-pointer">
                    <span className="absolute top-1/2 left-[20px] transform translate-y-[-50%]">
                      <svg
                        width="30"
                        height="25"
                        viewBox="0 0 68 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M44.1808 30.1621L29.2305 33.5134L44.1808 36.8649L47.9185 50.2702L52.2789 36.8649L67.2293 33.5134L52.2789 30.1621L47.2954 15.0811L44.1808 30.1621Z"
                          fill="white"
                        />
                        <path
                          d="M8.05019 8.61783L0 10.5329L8.05019 12.4479L10.0626 20.1081L12.4106 12.4479L20.4608 10.5329L12.4106 8.61783L9.72733 0L8.05019 8.61783Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    Launch ZenAI
                  </button>
                </ExplosionEffect>
              </motion.div>
            </div>

            <div className="md:col-span-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="rounded-lg shadow-lg p-6"
              >
                <h2 className="text-xl sm:text-2xl font-lato font-semibold flex items-center mb-4">
                  <span className="mr-2 text-yellow-500">
                    <svg
                      width="40"
                      height="36"
                      viewBox="0 0 40 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 36V32H34V36H6ZM6 29L3.45 12.95C3.38334 12.95 3.308 12.9587 3.224 12.976C3.14 12.9933 3.06534 13.0013 3 13C2.16667 13 1.45867 12.708 0.876004 12.124C0.293338 11.54 0.00133788 10.832 4.54546e-06 10C-0.00132879 9.168 0.290671 8.46 0.876004 7.87601C1.46134 7.29201 2.16934 7 3 7C3.83067 7 4.53934 7.29201 5.12601 7.87601C5.71267 8.46 6.004 9.168 6 10C6 10.2333 5.97467 10.45 5.924 10.65C5.87334 10.85 5.81534 11.0333 5.75 11.2L12 14L18.25 5.45C17.8833 5.18334 17.5833 4.83334 17.35 4.4C17.1167 3.96667 17 3.5 17 3C17 2.16667 17.292 1.458 17.876 0.874005C18.46 0.290005 19.168 -0.00132878 20 4.55581e-06C20.832 0.00133789 21.5407 0.293338 22.126 0.876004C22.7113 1.45867 23.0027 2.16667 23 3C23 3.5 22.8833 3.96667 22.65 4.4C22.4167 4.83334 22.1167 5.18334 21.75 5.45L28 14L34.25 11.2C34.1833 11.0333 34.1247 10.85 34.074 10.65C34.0233 10.45 33.9987 10.2333 34 10C34 9.16667 34.292 8.458 34.876 7.874C35.46 7.29 36.168 6.99867 37 7C37.832 7.00134 38.5407 7.29334 39.126 7.87601C39.7113 8.45867 40.0027 9.16667 40 10C39.9973 10.8333 39.706 11.542 39.126 12.126C38.546 12.71 37.8373 13.0013 37 13C36.9333 13 36.8587 12.992 36.776 12.976C36.6933 12.96 36.618 12.9513 36.55 12.95L34 29H6Z"
                        fill="#FFCD29"
                      />
                    </svg>
                  </span>
                  <span>My Membership</span>
                </h2>
                <span
                  className={`inline-block ${
                    membership?.status === "active"
                      ? "bg-green-200 font-lato text-green-700"
                      : "bg-[#EFEFEF] text-gray-800"
                  } text-xs px-2 py-1 rounded-full mb-4`}
                >
                  {membership?.status || "inactive"}
                </span>
                <p className="text-base sm:text-2xl font-lato text-[#808080] mb-6">
                  Join ZenAI to unlock premium features and personalized
                  guidance.
                </p>
                <ExplosionEffect className="w-full">
                  <button
                    className="w-full bg-[#FFCD29] text-white text-lg sm:text-xl py-3 rounded-full font-semibold hover:bg-yellow-300"
                    onClick={() => navigate("/membership")}
                  >
                    {membership?.status === "active"
                      ? "Manage Membership"
                      : "Join Now"}
                  </button>
                </ExplosionEffect>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="rounded-lg shadow-lg p-6"
              >
                <h2 className="text-xl sm:text-2xl font-lato font-semibold flex items-center mb-4">
                  <span className="mr-2 text-yellow-500">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9999 27C18.1434 27 16.3629 26.2625 15.0502 24.9498C13.7374 23.637 12.9999 21.8565 12.9999 20C12.9999 18.1435 13.7374 16.363 15.0502 15.0503C16.3629 13.7375 18.1434 13 19.9999 13C21.8564 13 23.6369 13.7375 24.9497 15.0503C26.2624 16.363 26.9999 18.1435 26.9999 20C26.9999 21.8565 26.2624 23.637 24.9497 24.9498C23.6369 26.2625 21.8564 27 19.9999 27ZM34.8599 21.94C34.9399 21.3 34.9999 20.66 34.9999 20C34.9999 19.34 34.9399 18.68 34.8599 18L39.0799 14.74C39.4599 14.44 39.5599 13.9 39.3199 13.46L35.3199 6.54C35.0799 6.1 34.5399 5.92 34.0999 6.1L29.1199 8.1C28.0799 7.32 26.9999 6.64 25.7399 6.14L24.9999 0.840004C24.9593 0.604438 24.8366 0.390858 24.6536 0.237107C24.4705 0.0833557 24.239 -0.000639549 23.9999 3.66694e-06H15.9999C15.4999 3.66694e-06 15.0799 0.360004 14.9999 0.840004L14.2599 6.14C12.9999 6.64 11.9199 7.32 10.8799 8.1L5.89992 6.1C5.45992 5.92 4.91992 6.1 4.67992 6.54L0.679923 13.46C0.419923 13.9 0.539923 14.44 0.919923 14.74L5.13992 18C5.05992 18.68 4.99992 19.34 4.99992 20C4.99992 20.66 5.05992 21.3 5.13992 21.94L0.919923 25.26C0.539923 25.56 0.419923 26.1 0.679923 26.54L4.67992 33.46C4.91992 33.9 5.45992 34.06 5.89992 33.9L10.8799 31.88C11.9199 32.68 12.9999 33.36 14.2599 33.86L14.9999 39.16C15.0799 39.64 15.4999 40 15.9999 40H23.9999C24.4999 40 24.9199 39.64 24.9999 39.16L25.7399 33.86C26.9999 33.34 28.0799 32.68 29.1199 31.88L34.0999 33.9C34.5399 34.06 35.0799 33.9 35.3199 33.46L39.3199 26.54C39.5599 26.1 39.4599 25.56 39.0799 25.26L34.8599 21.94Z"
                        fill="#FFCD29"
                      />
                    </svg>
                  </span>
                  <span>Account Settings</span>
                </h2>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center text-gray-700 text-lg sm:text-xl hover:text-purple-600 font-lato cursor-pointer">
                    <span>Profile Information</span>
                    <span className="text-gray-400">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 7.40192C18.5 8.55662 18.5 11.4434 16.5 12.5981L4.5 19.5263C2.5 20.681 0 19.2376 0 16.9282V3.07179C0 0.762393 2.5 -0.68098 4.5 0.473721L16.5 7.40192Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-gray-700 text-lg sm:text-xl hover:text-purple-600 font-lato cursor-pointer">
                    <span>Email Preference</span>
                    <span className="text-gray-400">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 7.40192C18.5 8.55662 18.5 11.4434 16.5 12.5981L4.5 19.5263C2.5 20.681 0 19.2376 0 16.9282V3.07179C0 0.762393 2.5 -0.68098 4.5 0.473721L16.5 7.40192Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-gray-700 text-lg sm:text-xl hover:text-purple-600 font-lato cursor-pointer">
                    <span>Password and Security</span>
                    <span className="text-gray-400">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 7.40192C18.5 8.55662 18.5 11.4434 16.5 12.5981L4.5 19.5263C2.5 20.681 0 19.2376 0 16.9282V3.07179C0 0.762393 2.5 -0.68098 4.5 0.473721L16.5 7.40192Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-gray-700 text-lg sm:text-xl hover:text-purple-600 font-lato cursor-pointer">
                    <span>Billing Information</span>
                    <span className="text-gray-400">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 7.40192C18.5 8.55662 18.5 11.4434 16.5 12.5981L4.5 19.5263C2.5 20.681 0 19.2376 0 16.9282V3.07179C0 0.762393 2.5 -0.68098 4.5 0.473721L16.5 7.40192Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
