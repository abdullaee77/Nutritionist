import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 10, color: "#2a3a30" },
  header: { borderBottom: 2, borderColor: "#a8475a", paddingBottom: 10, marginBottom: 20 },
  title: { fontSize: 20, color: "#a8475a", fontWeight: "bold" },
  subtitle: { fontSize: 12, color: "#8a5a44", marginTop: 4 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 14, color: "#a8475a", fontWeight: "bold", marginBottom: 6, backgroundColor: "#f7f1e6", padding: 6 },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 150, fontWeight: "bold", color: "#8a5a44" },
  value: { flex: 1 },
});

export default function ClientRecordPDF({ client, intake, feed, balance, fulfill, plan }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Naflar Health Care</Text>
          <Text style={styles.subtitle}>Client Record: {client.fullName}</Text>
          <Text style={styles.subtitle}>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* INTAKE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Intake & Safety</Text>
          <View style={styles.row}><Text style={styles.label}>Occupation:</Text><Text style={styles.value}>{intake?.occupation || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Main Concern:</Text><Text style={styles.value}>{intake?.mainConcern || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Importance (1-10):</Text><Text style={styles.value}>{intake?.importance_1_10 || "—"}</Text></View>
        </View>

        {/* FEED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Feed: Physical Assessment</Text>
          <View style={styles.row}><Text style={styles.label}>Height:</Text><Text style={styles.value}>{feed?.heightCm ? `${feed.heightCm} cm` : "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Weight:</Text><Text style={styles.value}>{feed?.currentWeight ? `${feed.currentWeight} kg` : "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Waist:</Text><Text style={styles.value}>{feed?.waistCm ? `${feed.waistCm} cm` : "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Allergies:</Text><Text style={styles.value}>{feed?.allergies || "—"}</Text></View>
        </View>

        {/* BALANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Balance: Mind & Lifestyle</Text>
          <View style={styles.row}><Text style={styles.label}>Sleep (hrs):</Text><Text style={styles.value}>{balance?.avgSleepHours || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Stress (1-10):</Text><Text style={styles.value}>{balance?.perceivedStress_1_10 || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Support:</Text><Text style={styles.value}>{balance?.supportPeople || "—"}</Text></View>
        </View>

        {/* FULFILL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Fulfill: Purpose</Text>
          <View style={styles.row}><Text style={styles.label}>Why it matters:</Text><Text style={styles.value}>{fulfill?.whyBodyMatters || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Intention:</Text><Text style={styles.value}>{fulfill?.intention || "—"}</Text></View>
        </View>

        {/* PLAN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Plan: Prescription</Text>
          <View style={styles.row}><Text style={styles.label}>Energy:</Text><Text style={styles.value}>{plan?.prescription?.energy_kcal ? `${plan.prescription.energy_kcal} kcal` : "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Protein:</Text><Text style={styles.value}>{plan?.prescription?.protein ? `${plan.prescription.protein} g` : "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Pattern:</Text><Text style={styles.value}>{plan?.prescription?.eating_pattern || "—"}</Text></View>
        </View>

      </Page>
    </Document>
  );
}