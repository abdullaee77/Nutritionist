import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 9, color: "#2a3a30" },
  headerTitle: { fontSize: 16, color: "#a8475a", fontWeight: "bold", textTransform: "uppercase", marginBottom: 4 },
  headerSub: { fontSize: 10, color: "#8a5a44", marginBottom: 20 },
  sectionTitle: { fontSize: 11, color: "#a8475a", fontWeight: "bold", marginTop: 15, marginBottom: 6, borderBottom: 1, borderColor: "#a8475a", paddingBottom: 2 },
  row: { flexDirection: "row", borderBottom: 1, borderColor: "#e2d6bf", paddingVertical: 4 },
  label: { width: "40%", fontWeight: "bold", color: "#8a5a44" },
  value: { width: "60%", color: "#2a3a30" },
  tableHeader: { flexDirection: "row", backgroundColor: "#f7f1e6", padding: 6, fontWeight: "bold", borderBottom: 1, borderColor: "#e2d6bf" },
});

export function NutritionAssessmentPDF({ client, intake, feed, balance, fulfill }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <Text style={styles.headerTitle}>Nutrition Assessment</Text>
        <Text style={styles.headerSub}>Nutrition Care Process (NCP) · Feed · Balance · Fulfill</Text>

        {/* Client Info Table */}
        <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf" }}>
          <View style={{ width: "50%", borderRight: 1, borderColor: "#e2d6bf", padding: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Name: {client.fullName}</Text>
            <Text>Date: {intake.dateOfAssessment || "—"}</Text>
            <Text>Age/Sex: {client.dob || "—"} / {client.sex || "—"}</Text>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <Text>Contact: {client.phone || "—"}</Text>
            <Text>Occupation: {intake.occupation || "—"}</Text>
            <Text>Referred by: {intake.referralSource || "—"}</Text>
          </View>
        </View>

        {/* A. FEED */}
        <Text style={styles.sectionTitle}>A. FEED · Body (Physical, Clinical Nutrition)</Text>
        
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Anthropometric data</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", border: 1, borderColor: "#e2d6bf" }}>
          <View style={{ width: "33%", padding: 6, borderRight: 1, borderColor: "#e2d6bf" }}><Text>Height: {feed.heightCm || "—"} cm</Text></View>
          <View style={{ width: "33%", padding: 6, borderRight: 1, borderColor: "#e2d6bf" }}><Text>Weight: {feed.currentWeight || "—"} kg</Text></View>
          <View style={{ width: "33%", padding: 6 }}><Text>BMI: {feed.bmi || "—"}</Text></View>
          <View style={{ width: "33%", padding: 6, borderTop: 1, borderColor: "#e2d6bf", borderRight: 1 }}><Text>Waist: {feed.waistCm || "—"} cm</Text></View>
          <View style={{ width: "33%", padding: 6, borderTop: 1, borderColor: "#e2d6bf", borderRight: 1 }}><Text>Goal Weight: {feed.goalWeight || "—"} kg</Text></View>
          <View style={{ width: "33%", padding: 6, borderTop: 1, borderColor: "#e2d6bf" }}><Text>Body Fat: {feed.bodyComp || "—"}</Text></View>
        </View>

        <Text style={{ fontWeight: "bold", marginTop: 10, marginBottom: 4 }}>Clinical history and physical findings</Text>
        <View style={{ border: 1, borderColor: "#e2d6bf", padding: 8 }}>
          <Text>Medical history: {feed.otherConditions || "None reported"}</Text>
          <Text>Allergies: {feed.allergies || "None reported"}</Text>
          <Text>Medications: Not recorded</Text>
          <Text>Blood pressure: {feed.bp || "—"}</Text>
        </View>

        {/* B. BALANCE */}
        <Text style={styles.sectionTitle}>B. BALANCE · Mind and Lifestyle</Text>
        <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf" }}>
          <View style={{ width: "50%", borderRight: 1, borderColor: "#e2d6bf", padding: 8 }}>
            <Text>Sleep: {balance.avgSleepHours || "—"} hrs</Text>
            <Text>Stress level: {balance.perceivedStress_1_10 || "—"}/10</Text>
            <Text>Physical activity: Not recorded</Text>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <Text>Support at home: {balance.supportPeople || "—"}</Text>
            <Text>Meal routine: Not recorded</Text>
            <Text>Mood and food: Not recorded</Text>
          </View>
        </View>

        {/* C. FULFILL */}
        <Text style={styles.sectionTitle}>C. FULFILL · Purpose and Spirit</Text>
        <View style={{ border: 1, borderColor: "#e2d6bf", padding: 8 }}>
          <Text style={{ marginBottom: 4 }}>What does a healthy life mean to you?</Text>
          <Text style={{ color: "#555", marginBottom: 8 }}>{fulfill.whyBodyMatters || "—"}</Text>
          <Text style={{ marginBottom: 4 }}>What is your deeper reason for change?</Text>
          <Text style={{ color: "#555" }}>{fulfill.purposeHereToDo || "—"}</Text>
        </View>

      </Page>
    </Document>
  );
}export function NutritionCarePlanPDF({ client, intake, feed, balance, fulfill, plan }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <Text style={styles.headerTitle}>My Nutrition Care Plan</Text>
        <Text style={styles.headerSub}>Prepared for {client.fullName} · {new Date().toLocaleDateString()}</Text>

        {/* 1. WHERE I AM TODAY */}
        <Text style={styles.sectionTitle}>1. Where I am today</Text>
        <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf" }}>
          <View style={{ width: "33%", borderRight: 1, borderColor: "#e2d6bf", padding: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 8, color: "#8a5a44", marginBottom: 4 }}>FEED (Body)</Text>
            <Text>Weight: {feed.currentWeight || "—"} kg</Text>
            <Text>Waist: {feed.waistCm || "—"} cm</Text>
          </View>
          <View style={{ width: "33%", borderRight: 1, borderColor: "#e2d6bf", padding: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 8, color: "#8a5a44", marginBottom: 4 }}>BALANCE (Mind)</Text>
            <Text>Sleep: {balance.avgSleepHours || "—"} hrs</Text>
            <Text>Stress: {balance.perceivedStress_1_10 || "—"}/10</Text>
          </View>
          <View style={{ width: "33%", padding: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 8, color: "#8a5a44", marginBottom: 4 }}>FULFILL (Purpose)</Text>
            <Text style={{ fontSize: 8 }}>{fulfill.intention || "No intention set yet."}</Text>
          </View>
        </View>

        {/* 2. MY NUTRITION PRESCRIPTION */}
        <Text style={styles.sectionTitle}>2. My Nutrition Prescription</Text>
        <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf" }}>
          <View style={{ width: "33%", padding: 8, borderRight: 1, borderColor: "#e2d6bf" }}>
            <Text style={{ fontWeight: "bold" }}>Energy</Text>
            <Text>{plan.prescription?.energy_kcal ? `${plan.prescription.energy_kcal} kcal` : "—"}</Text>
          </View>
          <View style={{ width: "33%", padding: 8, borderRight: 1, borderColor: "#e2d6bf" }}>
            <Text style={{ fontWeight: "bold" }}>Protein</Text>
            <Text>{plan.prescription?.protein ? `${plan.prescription.protein} g` : "—"}</Text>
          </View>
          <View style={{ width: "33%", padding: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Meals / Day</Text>
            <Text>{feed.mealsPerDay || "—"}</Text>
          </View>
        </View>

        {/* 3. MY EATING PLAN */}
        <Text style={styles.sectionTitle}>3. My Eating Plan</Text>
        <View style={{ border: 1, borderColor: "#e2d6bf", padding: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Eating Pattern / Timing:</Text>
          <Text style={{ color: "#555" }}>{plan.prescription?.eating_pattern || "Follow the plate model: half vegetables, a quarter protein, a quarter whole grains."}</Text>
        </View>

        {/* 4. MY BALANCE PLAN */}
        <Text style={styles.sectionTitle}>4. My Balance Plan</Text>
        <View style={{ border: 1, borderColor: "#e2d6bf", padding: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Sleep, Stress and Rest:</Text>
          <Text style={{ color: "#555" }}>Focus on getting 7-9 hours of sleep and managing stress through daily walks and breathing exercises.</Text>
        </View>

        {/* SIGN-OFF */}
        <View style={{ marginTop: 40, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "45%" }}>
            <Text style={{ borderBottom: 1, borderColor: "#2a3a30", height: 20 }}></Text>
            <Text style={{ marginTop: 4, fontSize: 8 }}>Dietitian Signature</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ borderBottom: 1, borderColor: "#2a3a30", height: 20 }}></Text>
            <Text style={{ marginTop: 4, fontSize: 8 }}>Client Signature & Date</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}