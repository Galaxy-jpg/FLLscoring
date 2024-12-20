({
 "title": "SUBMERGED",
  "missions": [{
    "title": "EI EQUIPMENT INSPECTION",
    "description": "N/A",
    "objectives": [{
      "id": "EI",
      "title": "The robot and all equipment fit completely in one launch area and under the height limit",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(EI) {
      EI = String(EI);
      if (EI === 'no') {
        return 0;
      }
      if (EI === 'yes') {
        return 20;
      }
    }]
  },
  {
    "title": "MO1 Coral Nursery",
    "description": "N/A",
    "objectives": [{
      "id": "M01_1",
      "title": "The coral tree is hanging on the coral tree support.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M01_2",
      "title": "The bottom of the coral tree is in its holder.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M01_3",
      "title": "The coral buds are flipped up.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M01_1, M01_2, M01_3) {
        M01_1 = String(M01_1);
        M01_2 = String(M01_2);
        M01_3 = String(M01_3);
        if (M01_3 === 'yes') {
          if (M01_1 === 'yes' && M01_2 === 'yes') {
            return 50;
          }
          if (M01_1 === 'yes' && M01_2 === 'no') {
            return 40;
          }
          if (M01_1 === 'no') {
            return 20;
          }
        }
        if (M01_3 === 'no') {
          if (M01_1 === 'yes' && M01_2 === 'yes') {
            return 30;
          }
          if (M01_1 === 'yes' && M01_2 === 'no') {
            return 20;
          }
          if (M01_1 === 'no') {
            return 0;
          }
        }
    }]
  },
  {
    "title": "M02 SHARK",
    "description": "N/A",
    "objectives": [{
        "id": "M02_1",
        "title": "The shark is no longer touching the cave",
        "type": "yesno",
        "default": "no"
      },
      {
        "id": "M02_2",
        "title": "The shark is touching the mat at least partly in the shark habitat.",
        "type": "yesno",
        "default": "no"
      }],
    "score": [function(M02_1, M02_2) {
      M02_1 = String(M02_1);
      M02_2 = String(M02_2);
      if (M02_1 === 'yes' && M02_2 === 'yes') {
        return 30;
      }
      if (M02_1 === 'yes' && M02_2 === 'no') {
          return 20;
      }
      if (M02_1 === 'no' && M02_2 === 'yes') {
          return 10;
      }
      if (M02_1 === 'no' && M02_2 === 'no') {
          return 0;
      }
    }]
  },
  {
    "title": "M03 CORAL REEF",
    "description": "N/A",
    "objectives": [{
       "id": "M03_1",
       "title": "The coral reef is flipped up, not touching the mat.",
       "type": "yesno",
       "default": "no"
        },
        {
        "id": "M03_2",
        "title": "Number of reef segments standing upright, outside of home, and touching the mat.",
        "options": [
          {
            "value": "0",
            "title": "0"
          },
          {
            "value": "1",
            "title": "1"
          },
          {
            "value": "2",
            "title": "2"
          },
          {
            "value": "3",
            "title": "3"
          }
        ],
        "type": "enum",
        "default": "0"
        }
      ],
      "score": [function(M03_1, M03_2) {
        M03_1 = String(M03_1);
        M03_2 = Number(M03_2);
        if (M03_1 === 'yes') {
          return M03_2 * 5 + 20;
        }
        if (M03_1 === 'no') {
          return M03_2 * 5;
        }
      }]
  }, 
  {
    "title": "M04 SCUBA DIVER",
    "description": "N/A",
    "objectives": [{
      "id": "M04_1",
      "title": "The scuba diver is no longer touching  the coral nursery.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M04_2",
      "title": "The scuba diver is hanging on the coral reef support.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M04_1, M04_2) {
      M04_1 = String(M04_1);
      M04_2 = String(M04_2);
      if (M04_1 === 'yes' && M04_2 === 'yes') {
        return 40;
      }
      if (M04_1 === 'yes' && M04_2 === 'no' || M04_1 === 'no' && M04_2 === 'yes') {
        return 20;
      }
      if (M04_1 === 'no' && M04_2 === 'no') {
        return 0;
      }
    }]
  },
  {
    "title": "M05 ANGLER FISH",
    "description": "N/A",
    "objectives": [{
      "id": "M05_1",
      "title": "The angler fish is latched within the shipwreck.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M05_1) {
      M05_1 = String(M05_1);
      if (M05_1 === 'yes') {
        return 30;
      }
      if (M05_1 === 'no') {
        return 0;
      }
    }]
  },
  {
    "title": "M06 RAISE THE MAST",
    "description": "N/A",
    "objectives": [{
      "id": "M06_1",
      "title": "The shipwrech's mast is completely raised.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M06_1) {
      M06_1 = String(M06_1);
      if (M06_1 === 'yes') {
        return 30;
      }
      if (M06_1 === 'no') {
        return 0;
      }
    }]
  },
  {
    "title": "M07 KRAKEN'S TREASURE",
    "description": "N/A",
    "objectives": [{
      "id": "M07_1",
      "title": "The treasure chest is completely outside the kraken's nest.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M07_1) {
      M07_1 = String(M07_1);
      if (M07_1 === 'yes') {
        return 20;
      }
      if (M07_1 === 'no') {
        return 0;
      }
    }]
  },
  {
    "title": "M08 ARTIFICIAL HABITAT",
    "description": "N/A",
    "objectives": [{
      "id": "M08_1",
      "title": "Number of artificial habitat stack segments completely flat and upright.",
      "options": [
        {
          "value": "0",
          "title": "0"
        },
        {
          "value": "1",
          "title": "1"
        },
        {
          "value": "2",
          "title": "2"
        },
        {
          "value": "3",
          "title": "3"
        },
        {
          "value": "4",
          "title": "4"
        }
      ],
      "type": "enum",
      "default": "0"
    }],
    "score": [function(M08_1) {
      M08_1 = Number(M08_1);
      return M08_1 * 10;
    }]
  },
  {
    "title": "M09 UNEXPECTED ENCOUNTER",
    "description": "N/A",
    "objectives": [{
      "id": "M09_1",
      "title": "The unknown creature is released.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M09_2",
      "title": "The unknown creature is at least partly in the cold seep.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M09_1, M09_2) {
        M09_1 = String(M09_1);
        M09_2 = String(M09_2);
        if (M09_1 === 'yes') {
          if (M09_2 === 'yes') {
            return 30;
          }
          if (M09_2 === 'no') {
            return 20;
          }
        }
        if (M09_1 === 'no') {
          if (M09_2 === 'yes') {
            return 10;
          }
          if (M09_2 === 'no') {
            return 0;
          }
        }
      }]
  },
  {
    "title": "M10 SEND OVER THE SUBMERSIBLE",
    "description": "N/A",
    "objectives": [{
      "id": "M10_1",
      "title": "Your team's yellow flag is down.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M10_2",
      "title": "The submersible is clearly closer to the opposing field.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M10_1, M10_2) {
      M10_1 = String(M10_1);
      M10_2 = String(M10_2);
      if (M10_1 === 'yes') {
        if (M10_2 === 'yes') {
          return 40;
        }
        if (M10_2 === 'no') {
          return 30;
        }
      }
      if (M10_1 === 'no') {
        if (M10_2 === 'yes') {
          return 10;
        }
        if (M10_2 === 'no') {
          return 0;
        }
      }
    }]
  },
  {
    "title": "M11 SONAR DISCOVERY",
    "description": "N/A",
    "objectives": [{
      "id": "M11_1",
      "title": "Number of whales revealed.",
      "options": [
        {
          "value": "0",
          "title": "0"
        },
        {
          "value": "1",
          "title": "1"
        },
        {
          "value": "2",
          "title": "2"
        }
      ],
      "type": "enum",
      "default": "0"
    }],
    "score": [function(M11_1) {
      M11_1 = String(M11_1);
      switch (M11_1) {
        case '0':
          return 0;
        case '1':
          return 20;
        case '2':
          return 30;
      }
    }]
  },
  {
    "title": "M12 FEED THE WHALE",
    "description": "N/A",
    "objectives": [{
      "id": "M12_1",
      "title": "Number of krill at least partly in the whale's mouth.",
      "options": [
        {
          "value": "0",
          "title": "0"
        },
        {
          "value": "1",
          "title": "1"
        },
        {
          "value": "2",
          "title": "2"
        },
        {
          "value": "3",
          "title": "3"
        },
        {
          "value": "4",
          "title": "4"
        },
        {
          "value": "5",
          "title": "5"
        }
      ],
      "type": "enum",
      "default": "0"
    }],
    "score": [function(M12_1) {
      M12_1 = Number(M12_1);
      return M12_1 * 10;
    }]
  },
  {
    "title": "M13 CHANGING SHIPPING LANES",
    "description": "N/A",
    "objectives": [{
      "id": "M13_1",
      "title": "The ship is in the new shipping lane, touching the mat.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function(M13_1) {
      M13_1 = String(M13_1);
      if (M13_1 === 'yes') {
        return 20;
      }
      if (M13_1 === 'no') {
        return 0;
      }
    }]
  },
  {
    "title": "M14 SAMPLE VESSEL",
    "description": "N/A",
    "objectives": [{
      "id": "M14_1",
      "title": "The water sample is completely outside the water sample area.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M14_2",
      "title": "The seabed sample is no longer touching the seabed.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M14_3",
      "title": "The plankton sample is no longer touching the kelp forest.",
      "type": "yesno",
      "default": "no"
    },
    {
      "id": "M14_4",
      "title": "Number of trident pieces no longer touching the shipwreck.",
      "options": [
        {
          "value": "0",
          "title": "0"
        },
        {
          "value": "1",
          "title": "1"
        },
        {
          "value": "2",
          "title": "2"
        }
      ],
      "type": "enum",
      "default": "0"
    }],
    "score": [function(M14_1, M14_2, M14_3, M14_4) {
      M14_1 = String(M14_1);
      M14_2 = String(M14_2);
      M14_3 = String(M14_3);
      M14_4 = Number(M14_4);
      if (M14_1 === 'yes' && M14_2 === 'yes' && M14_3 === 'yes') {
        switch (M14_4) {
          case 0:
            return 25;
          case 1:
            return 45;
          case 2:
            return 55;
        }
      }
      if (M14_1 === 'yes' && M14_2 === 'yes' && M14_3 === 'no' || M14_1 === 'yes' && M14_2 === 'no' && M14_3 === 'yes') {
        switch (M14_4) {
          case 0:
            return 15;
          case 1:
            return 35;
          case 2:
            return 45;
        }
      }
      if (M14_1 === 'yes' && M14_2 === 'no' && M14_3 === 'no') {
        switch (M14_4) {
          case 0:
            return 5;
          case 1:
            return 25;
          case 2:
            return 35;
        }
      }
      if (M14_1 === 'no' && M14_2 === 'yes' && M14_3 === 'yes') {
        switch (M14_4) {
          case 0:
            return 20;
          case 1:
            return 40;
          case 2:
            return 50;
        }
      }
      if (M14_1 === 'no' && M14_2 === 'yes' && M14_3 === 'no' || M14_1 === 'no' && M14_2 === 'no' && M14_3 === 'yes') {
        switch (M14_4) {
          case 0:
            return 10;
          case 1:
            return 30;
          case 2:
            return 40;
        }
      }
      if (M14_1 === 'no' && M14_2 === 'no' && M14_3 === 'no') {
        switch (M14_4) {
          case 0:
            return 0;
          case 1:
            return 20;
          case 2:
            return 30;
        }
      }
    }]
  },
  {
    "title": "M15 RESEARCH VESSEL",
    "description": "N/A",
    "objectives": [{
      "id": "M15_1",
      "title": "Number of samples, trident part(s), or treasure chest at least partly in the research vessel's cargo area.",
      "options": [{
        "title": "0",
        "value": "0"
      },
      {
        "title": "1",
        "value": "1"
      },
      {
        "title": "2",
        "value": "2"
      },
      {
        "title": "3",
        "value": "3"
      },
      {
        "title": "4",
        "value": "4"
      },
      {
        "title": "5",
        "value": "5"
      },
      {
        "title": "6",
        "value": "6"
      }],
      "type": "enum",
      "default": "0"
    },
    {
      "id": "M15_2",
      "title": "The ports latch is at least partly in the research vessel's loop.",
      "type": "yesno",
      "default": "no"
    }],
    "score": [function (M15_1, M15_2) {
      M15_1 = Number(M15_1);
      M15_2 = String(M15_2);
      if (M15_2 === 'yes') {
        return M15_1 * 5 + 20;
      }
      if (M15_3 === 'no') {
        return M15_1 * 5;
      }
    }]
  },
  {
    "title": "PRECISION TOKENS",
    "description": "N/A",
    "objectives": [{
      "id": "PT",
      "title": "Number of precision tokens remaining.",
      "options": [
        {
          "title": "0",
          "value": "0"
        },
        {
          "title": "1",
          "value": "1"
        },
        {
          "title": "2",
          "value": "2"
        },
        {
          "title": "3",
          "value": "3"
        },
        {
          "title": "4",
          "value": "4"
        },
        {
          "title": "5",
          "value": "5"
        },
        {
          "title": "6",
          "value": "6"
        }
      ],
      "type": "enum",
      "default": "6"
    }],
    "score": [function(PT) {
      PT = Number(PT)
      switch (PT) {
        case 0:
          return 0;
        case 1:
          return 10;
        case 2:
          return 15;
        case 3:
          return 25;
        case 4:
          return 35;
        case 5:
          return 50;
        case 6:
          return 50;
      }
    }]
  },
  {
    "title": "GRACIOUS PROFESSIONALISM",
    "description": "N/A",
    "objectives": [{
      "id": "GP",
      "title": "Gracious Professionalism displayed at the robot game table.",
      "options": [
      {
        "title": "DEVELOPING 2",
        "value": "2"
      },
      {
        "title": "ACCOMPLISHED 3",
        "value": "3"
      },
      {
        "title": "EXCEEDS 4",
        "value": "4"
      }],
      "type": "enum",
      "default": "3"
    }],
    "score": [function(GP) {
        return 0;
    }]
  },
  ],
  "strings": {
    "yes": "Yes",
    "no": "No",
    "None": "None"
  },
  "rtl": false
})
