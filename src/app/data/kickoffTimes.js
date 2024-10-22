const kickoffTimes = [
  {
    team: "ARI",
    date: "10-27-2024",
    
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "ATL",
    date: "10-27-2024",
    
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "BAL",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "BUF",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CAR",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CHI",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CIN",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "CLE",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "DAL",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:20",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "DEN",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "DET",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "GB",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "HOU",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "IND",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "JAC",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "KC",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "LV",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:25",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "LAC",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "LAR",
    date: "10-24-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "MIA",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "MIN",
    date: "10-24-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NE",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NO",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NYG",
    date: "10-28-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "NYJ",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:20",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "PHI",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "PIT",
    date: "10-28-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:15",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "SF",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "19:20",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "SEA",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "15:05",
   
  },
  {
    team: "TB",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "TEN",
    date: "10-27-2024",
    // the above is in the format of "MM-DD-YYYY"
    kick: "12:00",
    //the above is (in 24-hour format, e.g., "14:30" for 2:30 PM)
  },
  {
    team: "WAS",
    date: "10-27-2024",
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