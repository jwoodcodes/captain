const kickoffTimes = [
  {
    team: "ARI",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "ATL",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "BAL",
    date: "09-05-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "BUF",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CAR",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CHI",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CIN",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CLE",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "DAL",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "DEN",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "DET",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:20",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "GB",
    date: "09-06-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "HOU",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "IND",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "JAC",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "KC",
    date: "09-05-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:30",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "LV",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "LAC",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "LAR",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:20",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "MIA",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "MIN",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NE",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NO",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NYG",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NYJ",
    date: "09-09-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "PHI",
    date: "09-06-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "PIT",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "SF",
    date: "09-09-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "SEA",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "TB",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "TEN",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "WAS",
    date: "09-08-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
];

export default kickoffTimes;

// 12:00 12:00
//  1:00 13:00
//  2:00 14:00
//  3:00 15:00
//  4:00 16:00
//  5:00 17:00
//  6:00 18:00
//  7:00 19:00
//  8:00 20:00
//  9:00 21:00
// 10:00 22:00
// 11:00 23:00
