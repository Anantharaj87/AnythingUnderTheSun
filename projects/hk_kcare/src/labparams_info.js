const labparams_info = {
    "version": 1,
    "tests": [{
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Haemoglobin",
        "ref": {
            "range": {
                "min": 12,
                "max": 15
            },
            "unit": "gm/dl"
        },
        "cost": 100,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Total RBC count",
        "ref": {
            "range": {
                "min": 3.8,
                "max": 4.8
            },
            "unit": "million cells/cumm"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "PCV",
        "ref": {
            "range": {
                "min": 36,
                "max": 46
            },
            "unit": "%"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Total WBC count",
        "ref": {
            "range": {
                "min": 4000,
                "max": 11000
            },
            "unit": "cells/cumm"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Differential-Neutrophils",
        "ref": {
            "range": {
                "min": 40,
                "max": 75
            },
            "unit": "%"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Differential-Lymphocytes",
        "ref": {
            "range": {
                "min": 20,
                "max": 45
            },
            "unit": "%"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Differential-Mixed cells",
        "ref": {
            "range": {
                "min": 2,
                "max": 10
            },
            "unit": "%"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "MCV",
        "ref": {
            "range": {
                "min": 83,
                "max": 101
            },
            "unit": "fl"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "MCH",
        "ref": {
            "range": {
                "min": 27,
                "max": 32
            },
            "unit": "pg"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "MCHC",
        "ref": {
            "range": {
                "min": 32,
                "max": 36
            },
            "unit": "%"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "hematology",
        "group": "complete blood count",
        "parameter": "Platelet count",
        "ref": {
            "range": {
                "min": 150000,
                "max": 450000
            },
            "unit": "cells/cumm"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "blood grouping and typing",
        "group": "na",
        "parameter": "Blood group",
        "ref": {
            "group": ["O", "A", "B", "AB"],
            "unit": ""
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "blood grouping and typing",
        "group": "na",
        "parameter": "Rh (D) type",
        "ref": {
            "group": ["positive", "negative"],
            "unit": ""
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "na",
        "parameter": "Blood sugar (Random)",
        "ref": {
            "range": {
                "min": 70,
                "max": 200
            },
            "unit": "mg/dl"
        },
        "cost": 50,
        "groupcost": -1
    }, {
        "branch": "biochemistry",
        "group": "na",
        "parameter": "Blood sugar (Fasting)",
        "ref": {
            "range": {
                "min": 70,
                "max": 100
            },
            "unit": "mg/dl"
        },
        "cost": 50,
        "groupcost": -1
    }, {
        "branch": "biochemistry",
        "group": "na",
        "parameter": "Blood sugar (Post prandial)",
        "ref": {
            "range": {
                "min": 100,
                "max": 140
            },
            "unit": "mg/dl"
        },
        "cost": 50,
        "groupcost": -1
    }, {
        "branch": "biochemistry",
        "group": "na",
        "parameter": "HbA1C",
        "ref": {
            "range": {
                "min": 0,
                "max": 5.7
            },
            "unit": "%"
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "biochemistry",
        "group": "renal function test",
        "parameter": "Blood Urea",
        "ref": {
            "range": {
                "min": 15,
                "max": 45
            },
            "unit": "mg/dl"
        },
        "cost": 75,
        "groupcost": -1
    }, {
        "branch": "biochemistry",
        "group": "renal function test",
        "parameter": "Serum Creatinine",
        "ref": {
            "range": {
                "min": 0.6,
                "max": 1.2
            },
            "unit": "mg/dl"
        },
        "cost": 75,
        "groupcost": -1
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Sodium",
        "ref": {
            "range": {
                "min": 135,
                "max": 145
            },
            "unit": "meq/l"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Potassium",
        "ref": {
            "range": {
                "min": 3.5,
                "max": 5.5
            },
            "unit": "meq/l"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Chloride",
        "ref": {
            "range": {
                "min": 98,
                "max": 107
            },
            "unit": "meq/l"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Bicarbonate",
        "ref": {
            "range": {
                "min": 22,
                "max": 26
            },
            "unit": "meq/l"
        },
        "cost": -1,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Calcium",
        "ref": {
            "range": {
                "min": 8.6,
                "max": 10.8
            },
            "unit": "mg/dl"
        },
        "cost": 100,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Phosphorus",
        "ref": {
            "range": {
                "min": 2.5,
                "max": 4.5
            },
            "unit": "mg/dl"
        },
        "cost": 100,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "electrolytes",
        "parameter": "Serum Uric Acid",
        "ref": {
            "range": {
                "min": 3.5,
                "max": 6.5
            },
            "unit": "mg/dl"
        },
        "cost": 100,
        "groupcost": 250
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "Bilirubin Total",
        "ref": {
            "range": {
                "min": 0.3,
                "max": 1.2
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "Bilirubin Direct",
        "ref": {
            "range": {
                "min": 0,
                "max": 0.2
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "Bilirubin Indirect",
        "ref": {
            "range": {
                "min": 0,
                "max": 0.8
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "SGOT",
        "ref": {
            "range": {
                "min": 0,
                "max": 40
            },
            "unit": "u/l"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "SGPT",
        "ref": {
            "range": {
                "min": 0,
                "max": 40
            },
            "unit": "u/l"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "Alkaline Phosphatase",
        "ref": {
            "range": {
                "min": 0,
                "max": 170
            },
            "unit": "u/l"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "Total Protein",
        "ref": {
            "range": {
                "min": 6,
                "max": 8
            },
            "unit": "g/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "liver function test",
        "parameter": "Albumin",
        "ref": {
            "range": {
                "min": 4.5,
                "max": 6
            },
            "unit": "g/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "lipid profile",
        "parameter": "Total Cholesterol",
        "ref": {
            "range": {
                "min": 120,
                "max": 200
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "lipid profile",
        "parameter": "Triglycerides",
        "ref": {
            "range": {
                "min": 130,
                "max": 150
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "lipid profile",
        "parameter": "LDL Cholesterol",
        "ref": {
            "range": {
                "min": 0,
                "max": 150
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "lipid profile",
        "parameter": "HDL Cholesterol",
        "ref": {
            "range": {
                "min": 55
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "biochemistry",
        "group": "lipid profile",
        "parameter": "VLDL cholesterol",
        "ref": {
            "range": {
                "min": 10,
                "max": 99
            },
            "unit": "mg/dl"
        },
        "cost": -1,
        "groupcost": 400
    }, {
        "branch": "serology",
        "group": "na",
        "parameter": "HIV - I & II (Rapid card test)",
        "ref": {
            "group": ["positive", "negative"],
            "unit": ""
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "serology",
        "group": "na",
        "parameter": "HBsAg (Rapid card test)",
        "ref": {
            "group": ["positive", "negative"],
            "unit": ""
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "serology",
        "group": "na",
        "parameter": "HCV (Rapid card test)",
        "ref": {
            "group": ["positive", "negative"],
            "unit": ""
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Colour",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Reaction",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "pH",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Specific gravity",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Albumin",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Glucose",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Bile salt",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Bile pigment",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "urine routine examination",
        "parameter": "Ketone",
        "cost": -1,
        "groupcost": 50
    }, {
        "branch": "clinicalpathology",
        "group": "microscopy",
        "parameter": "RBC",
        "ref": {
            "unit": "hpf"
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "clinicalpathology",
        "group": "microscopy",
        "parameter": "Pus cells",
        "ref": {
            "unit": "hpf"
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "clinicalpathology",
        "group": "microscopy",
        "parameter": "Epithelial cells",
        "ref": {
            "unit": "hpf"
        },
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "clinicalpathology",
        "group": "microscopy",
        "parameter": "Casts",
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "clinicalpathology",
        "group": "microscopy",
        "parameter": "Crystals",
        "cost": -1,
        "groupcost": -1
    }, {
        "branch": "clinicalpathology",
        "group": "microscopy",
        "parameter": "Bacteria",
        "cost": -1,
        "groupcost": -1
    }]
}

export default labparams_info;
