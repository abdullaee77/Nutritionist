import { Document, Page, Text, View, StyleSheet, Svg, Path, Circle, Rect, Polygon } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 9, color: "#2a3a30", paddingBottom: 60 },
  headerBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: 1, borderColor: "#e2d6bf", paddingBottom: 10, marginBottom: 30 },
  logoText: { fontSize: 16, color: "#a8475a", fontWeight: "bold", letterSpacing: 1 },
  logoSub: { fontSize: 8, color: "#a9bfa4", letterSpacing: 1 },
  headerRight: { fontSize: 8, color: "#8a5a44", textTransform: "uppercase", letterSpacing: 1 },
  title: { fontSize: 32, color: "#a8475a", fontFamily: "Times-Roman", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 12, color: "#8a5a44", fontStyle: "italic", textAlign: "center", marginBottom: 20 },
  intro: { fontSize: 10, lineHeight: 1.5, marginBottom: 15 },
  promiseBox: { border: 1, borderColor: "#e2d6bf", backgroundColor: "#f7f1e6", padding: 12, marginBottom: 20 },
  promiseTitle: { color: "#a8475a", fontWeight: "bold", fontFamily: "Times-Roman", fontSize: 12, marginBottom: 4 },
  promiseText: { fontSize: 10, fontStyle: "italic" },
  pillHeader: { backgroundColor: "#a8475a", color: "#fff", fontWeight: "bold", padding: "6px 12px", borderRadius: 4, fontSize: 11, marginTop: 15, marginBottom: 10, alignSelf: "flex-start" },
  bulletRow: { flexDirection: "row", marginBottom: 6 },
  bulletDot: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, lineHeight: 1.4 },
  table: { width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: "#e2d6bf", marginBottom: 20, marginTop: 10 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#e2d6bf", minHeight: 25 },
  tableHeader: { backgroundColor: "#a8475a", color: "#fff", fontWeight: "bold" },
  tableCol: { width: "20%", borderRightWidth: 1, borderColor: "#e2d6bf", padding: 6, justifyContent: "center" },
  tableColWide: { width: "40%", borderRightWidth: 1, borderColor: "#e2d6bf", padding: 6, justifyContent: "center" },
  labelBox: { backgroundColor: "#f7f1e6", padding: 6, fontWeight: "bold", color: "#a8475a", fontFamily: "Times-Roman", borderRight: 1, borderColor: "#e2d6bf", fontSize: 9 },
  checkRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
});

const NaflarLogo = () => (
  <Svg width="60" height="60" viewBox="0 0 120 120" style={{ alignSelf: "center", marginBottom: 10 }}>
    <Rect x="12" y="34" width="22" height="3" fill="#A8475A" /><Rect x="18" y="34" width="8" height="62" fill="#A8475A" /><Rect x="12" y="93" width="22" height="3" fill="#A8475A" /><Polygon points="18,34 32,34 86,95 72,95" fill="#A8475A" /><Path d="M78 96 C70 60 88 46 108 16 C106 62 94 84 78 96 Z" fill="#A9BFA4" /><Path d="M78 96 C78 76 84 66 97 55 C97 76 90 88 78 96 Z" fill="#E3B866" /><Circle cx="72" cy="28" r="7" fill="#E3B866" />
  </Svg>
);

const HeaderBar = ({ title }: { title: string }) => (
  <View style={styles.headerBar} fixed>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Svg width="24" height="24" viewBox="0 0 120 120">
        <Rect x="12" y="34" width="22" height="3" fill="#A8475A" /><Rect x="18" y="34" width="8" height="62" fill="#A8475A" /><Rect x="12" y="93" width="22" height="3" fill="#A8475A" /><Polygon points="18,34 32,34 86,95 72,95" fill="#A8475A" /><Path d="M78 96 C70 60 88 46 108 16 C106 62 94 84 78 96 Z" fill="#A9BFA4" /><Path d="M78 96 C78 76 84 66 97 55 C97 76 90 88 78 96 Z" fill="#E3B866" /><Circle cx="72" cy="28" r="7" fill="#E3B866" />
      </Svg>
      <View><Text style={styles.logoText}>NAFLAR</Text><Text style={styles.logoSub}>HEALTHCARE</Text></View>
    </View>
    <Text style={styles.headerRight}>{title}</Text>
  </View>
);

const Footer = () => (
  <View style={{ position: "absolute", bottom: 30, left: 40, right: 40, borderTop: 1, borderColor: "#e2d6bf", paddingTop: 10 }} fixed>
    <Text style={{ fontSize: 7, color: "#8a5a44", textAlign: "center", fontStyle: "italic" }}>
      This guide is general nutrition education. It does not replace individual medical advice. If you have a health condition or take medication, follow your clinician and dietitian.
    </Text>
  </View>
);

export default function ResourcePDF({ resource }: any) {
  const isMethodGuide = resource.key === "method-guide";
  const isWelcomePack = resource.key === "welcome-pack";
  const isTrackers = resource.key === "trackers";
  const isSevenDay = resource.key === "7-day-challenge";
  const isGuides = resource.key === "everyday-guides";
  const isWorkbook = resource.key === "workbook";
  const isAssessment = resource.key === "nutrition-assessment";
  const isLogPlain = resource.key === "prediabetes-log-plain";
  const isLogNaflar = resource.key === "prediabetes-log-naflar";
  
  const data = (isMethodGuide || isWelcomePack || isTrackers || isSevenDay || isGuides || isWorkbook || isAssessment || isLogPlain || isLogNaflar) && resource.sections.length > 0 ? resource.sections[0] : null;

  // 1. METHOD GUIDE
  if (isMethodGuide && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="THE NAFLAR METHOD" />
          <NaflarLogo />
          <Text style={styles.title}>The Naflar Method</Text>
          <Text style={styles.subtitle}>Feed · Balance · Fulfill</Text>
          <Text style={styles.intro}>{data.intro}</Text>
          
          <View style={styles.promiseBox}>
            <Text style={styles.promiseTitle}>Our promise</Text>
            <Text style={styles.promiseText}>{data.promise}</Text>
          </View>

          <Text style={styles.pillHeader}>FEED · The body</Text>
          <Text style={{ marginBottom: 8 }}>{data.feedText}</Text>
          {data.feedBullets?.map((b: string, i: number) => (
            <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{b}</Text></View>
          ))}

          <Text style={styles.pillHeader}>BALANCE · Mind and lifestyle</Text>
          <Text style={{ marginBottom: 8 }}>{data.balanceText}</Text>
          {data.balanceBullets?.map((b: string, i: number) => (
            <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{b}</Text></View>
          ))}

          <Text style={styles.pillHeader}>FULFILL · Purpose and spirit</Text>
          <Text style={{ marginBottom: 8 }}>{data.fulfillText}</Text>
          {data.fulfillBullets?.map((b: string, i: number) => (
            <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{b}</Text></View>
          ))}

          <Text style={[styles.pillHeader, { marginTop: 30, width: "100%", textAlign: "center" }]}>YOUR 6-WEEK JOURNEY</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}><Text>Week</Text></View>
              <View style={styles.tableCol}><Text>Focus</Text></View>
              <View style={[styles.tableColWide, { borderRightWidth: 0 }]}><Text>One simple practice</Text></View>
            </View>
            {data.journey?.map((row: any, i: number) => (
              <View key={i} style={[styles.tableRow, i === data.journey.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                <View style={styles.tableCol}><Text>{row.week}</Text></View>
                <View style={styles.tableCol}><Text>{row.focus}</Text></View>
                <View style={[styles.tableColWide, { borderRightWidth: 0 }]}><Text>{row.practice}</Text></View>
              </View>
            ))}
          </View>

          <Text style={{ color: "#a8475a", fontFamily: "Times-Roman", fontWeight: "bold", fontSize: 12, marginBottom: 8 }}>Your reflection</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { borderBottomWidth: 1 }]}>
              <View style={[styles.tableCol, { width: "30%", backgroundColor: "#f7f1e6", borderRightWidth: 1 }]}><Text style={{ color: "#a8475a", fontFamily: "Times-Roman" }}>The habit I am proudest of</Text></View>
              <View style={[styles.tableColWide, { width: "70%", borderRightWidth: 0, height: 40 }]} />
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 1 }]}>
              <View style={[styles.tableCol, { width: "30%", backgroundColor: "#f7f1e6", borderRightWidth: 1 }]}><Text style={{ color: "#a8475a", fontFamily: "Times-Roman" }}>The habit I want to keep</Text></View>
              <View style={[styles.tableColWide, { width: "70%", borderRightWidth: 0, height: 40 }]} />
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.tableCol, { width: "30%", backgroundColor: "#f7f1e6", borderRightWidth: 1 }]}><Text style={{ color: "#a8475a", fontFamily: "Times-Roman" }}>My reason (my why)</Text></View>
              <View style={[styles.tableColWide, { width: "70%", borderRightWidth: 0, height: 40 }]} />
            </View>
          </View>
          <Footer />
        </Page>
      </Document>
    );
  }

  // 2. WELCOME PACK
  if (isWelcomePack && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="WELCOME PACK" />
          <NaflarLogo />
          <Text style={styles.title}>Welcome to Naflar</Text>
          <Text style={styles.subtitle}>We are glad you are here</Text>
          
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>{data.dearClient}</Text>
          <Text style={styles.intro}>{data.introText1}</Text>
          <Text style={{ fontStyle: "italic", color: "#8a5a44", marginBottom: 20 }}>{data.signOff}</Text>

          <Text style={styles.pillHeader}>HOW WE WORK</Text>
          {data.howWeWork?.map((b: string, i: number) => (
            <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{b}</Text></View>
          ))}
          <View style={{ marginBottom: 15 }} />

          <Text style={styles.pillHeader}>BEFORE YOUR FIRST VISIT</Text>
          <View style={{ marginBottom: 15 }}>
            {data.beforeVisit?.map((item: string, i: number) => (
              <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>☐</Text><Text>{item}</Text></View>
            ))}
          </View>

          <Text style={styles.pillHeader}>YOUR PROGRAM</Text>
          <View style={{ marginBottom: 10 }}>
            {data.programs?.map((item: string, i: number) => (
              <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>☐</Text><Text>{item}</Text></View>
            ))}
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.labelBox, { width: "30%" }]}><Text>Start date</Text></View>
              <View style={[{ width: "20%", padding: 8, borderRight: 1, borderColor: "#e2d6bf" }]}><Text>{data.programDetails?.startDate}</Text></View>
              <View style={[styles.labelBox, { width: "30%" }]}><Text>First follow-up</Text></View>
              <View style={[{ width: "20%", padding: 8 }]}><Text>{data.programDetails?.firstFollowUp}</Text></View>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.labelBox, { width: "30%" }]}><Text>Session times</Text></View>
              <View style={[{ width: "20%", padding: 8, borderRight: 1, borderColor: "#e2d6bf" }]}><Text>{data.programDetails?.sessionTimes}</Text></View>
              <View style={[styles.labelBox, { width: "30%" }]}><Text>Contact for WhatsApp</Text></View>
              <View style={[{ width: "20%", padding: 8 }]}><Text>{data.programDetails?.contact}</Text></View>
            </View>
          </View>

          <Text style={styles.pillHeader}>GOOD TO KNOW</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.labelBox, { width: "30%" }]}><Text>Rescheduling / cancellation</Text></View>
              <View style={[{ width: "70%", padding: 8, minHeight: 30 }]}><Text>{data.goodToKnow?.reschedule}</Text></View>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.labelBox, { width: "30%" }]}><Text>Payment details</Text></View>
              <View style={[{ width: "70%", padding: 8, minHeight: 30 }]}><Text>{data.goodToKnow?.payment}</Text></View>
            </View>
          </View>

          <Text style={[styles.pillHeader, { textAlign: "center", width: "100%" }]}>COMMON QUESTIONS</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 2 }}>{data.faqs?.q1}</Text>
            <Text style={{ marginBottom: 10 }}>{data.faqs?.a1}</Text>
            <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 2 }}>{data.faqs?.q2}</Text>
            <Text style={{ marginBottom: 10 }}>{data.faqs?.a2}</Text>
            <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 2 }}>{data.faqs?.q3}</Text>
            <Text style={{ marginBottom: 10 }}>{data.faqs?.a3}</Text>
          </View>
          <Footer />
        </Page>
      </Document>
    );
  }

  // 3. TRACKERS
  if (isTrackers && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="TRACKERS" />
          <NaflarLogo />
          <Text style={styles.title}>My Trackers</Text>
          <Text style={styles.subtitle}>Small notes, big awareness</Text>

          <Text style={styles.pillHeader}>DAILY FOOD AND MOOD JOURNAL</Text>
          
          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 10 }}>
            <View style={[styles.labelBox, { width: "15%", borderBottom: 0 }]}><Text>Date</Text></View>
            <View style={{ width: "35%", borderRight: 1, borderColor: "#e2d6bf" }}></View>
            <View style={[styles.labelBox, { width: "15%", borderBottom: 0 }]}><Text>Day / week</Text></View>
            <View style={{ width: "35%" }}></View>
          </View>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "15%" }]}><Text>Time</Text></View>
              <View style={[styles.tableCol, { width: "35%" }]}><Text>What I ate and drank</Text></View>
              <View style={[styles.tableCol, { width: "15%" }]}><Text>Hunger (1-5)</Text></View>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Mood / feeling</Text></View>
              <View style={[styles.tableCol, { width: "15%", borderRightWidth: 0 }]}><Text>Where / with whom</Text></View>
            </View>
            {["Wake-up", "Breakfast", "Mid-morning", "Lunch", "Evening", "Dinner", "Night"].map((meal, i) => (
              <View key={i} style={[styles.tableRow, i === 6 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "15%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{meal}</Text></View>
                <View style={[styles.tableCol, { width: "35%" }]} />
                <View style={[styles.tableCol, { width: "15%" }]} />
                <View style={[styles.tableCol, { width: "20%" }]} />
                <View style={[styles.tableCol, { width: "15%", borderRightWidth: 0 }]} />
              </View>
            ))}
          </View>

          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 30 }}>
            <View style={[styles.labelBox, { width: "25%", borderRight: 1, borderColor: "#e2d6bf" }]}><Text>Water today</Text></View>
            <View style={{ width: "75%", height: 25 }}></View>
          </View>
          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 30 }}>
            <View style={[styles.labelBox, { width: "25%", borderRight: 1, borderColor: "#e2d6bf" }]}><Text>Movement today</Text></View>
            <View style={{ width: "75%", height: 25 }}></View>
          </View>
          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 30 }}>
            <View style={[styles.labelBox, { width: "25%", borderRight: 1, borderColor: "#e2d6bf" }]}><Text>Sleep last night</Text></View>
            <View style={{ width: "75%", height: 25 }}></View>
          </View>
          <Footer />
        </Page>

        <Page size="A4" style={styles.page}>
          <HeaderBar title="TRACKERS" />
          <Text style={styles.pillHeader}>WEEKLY HABIT TRACKER</Text>

          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 10 }}>
            <View style={[styles.labelBox, { width: "15%" }]}><Text>Week</Text></View>
            <View style={{ width: "35%", borderRight: 1, borderColor: "#e2d6bf", padding: 6 }}><Text>{data.week}</Text></View>
            <View style={[styles.labelBox, { width: "15%" }]}><Text>Dates</Text></View>
            <View style={{ width: "35%", padding: 6 }}><Text>{data.dates}</Text></View>
          </View>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "28%" }]}><Text>Habit</Text></View>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                <View key={i} style={[styles.tableCol, { width: "10.2%", alignItems: "center", borderRightWidth: i === 6 ? 0 : 1 }]}><Text>{d}</Text></View>
              ))}
            </View>
            {["Vegetables at 2 meals", "Water through the day", "Regular meal times", "10-minute movement", "No screens while eating", "Sleep on time", "Pause / breathe", "Gratitude note", data.customHabit || "My own habit:"].map((habit, i) => (
              <View key={i} style={[styles.tableRow, i === 8 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "28%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{habit}</Text></View>
                {[1,2,3,4,5,6,7].map(d => (
                  <View key={d} style={[styles.tableCol, { width: "10.2%", borderRightWidth: d === 7 ? 0 : 1 }]} />
                ))}
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>WEEKLY REFLECTION</Text>
          
          <View style={styles.table}>
            {["FEED: how did I nourish my body?", "BALANCE: how was my sleep, stress and rhythm?", "FULFILL: what gave me purpose or peace?", "One win this week", "One thing to improve"].map((prompt, i) => (
              <View key={i} style={[styles.tableRow, i === 4 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "35%" }]}><Text>{prompt}</Text></View>
                <View style={{ width: "65%", height: 30 }}></View>
              </View>
            ))}
          </View>
          <Footer />
        </Page>
      </Document>
    );
  }

  // 4. 7-DAY RESET
  if (isSevenDay && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="PROGRAMS" />
          <NaflarLogo />
          <Text style={styles.title}>The 7-Day Reset</Text>
          <Text style={styles.subtitle}>Feed · Balance · Fulfill. One small step a day</Text>
          <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 10 }}>Tick each day when done. Do not aim for perfect. Aim for steady.</Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "10%" }]}><Text>Day</Text></View>
              <View style={[styles.tableCol, { width: "30%" }]}><Text>Feed</Text></View>
              <View style={[styles.tableCol, { width: "30%" }]}><Text>Balance</Text></View>
              <View style={[styles.tableCol, { width: "30%", borderRightWidth: 0 }]}><Text>Fulfill</Text></View>
            </View>
            {data.days?.map((row: any, i: number) => (
              <View key={i} style={[styles.tableRow, i === data.days.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "10%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{i + 1}</Text></View>
                <View style={[styles.tableCol, { width: "30%" }]}><Text>{row.feed}</Text></View>
                <View style={[styles.tableCol, { width: "30%" }]}><Text>{row.balance}</Text></View>
                <View style={[styles.tableCol, { width: "30%", borderRightWidth: 0 }]}><Text>{row.fulfill}</Text></View>
              </View>
            ))}
          </View>

          <Text style={{ color: "#a8475a", fontFamily: "Times-Roman", fontWeight: "bold", fontSize: 14, marginBottom: 8 }}>Check-off</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {[1,2,3,4,5,6,7].map((d, i) => (
                <View key={d} style={[styles.tableCol, { width: "14.2%", borderRightWidth: i === 6 ? 0 : 1 }]}><Text>Day {d}</Text></View>
              ))}
            </View>
            <View style={styles.tableRow}>
              {[1,2,3,4,5,6,7].map((d, i) => (
                <View key={d} style={[styles.tableCol, { width: "14.2%", height: 30, borderRightWidth: i === 6 ? 0 : 1 }]} />
              ))}
            </View>
          </View>

          <View style={[styles.table, { marginTop: 20 }]}>
            <View style={styles.tableRow}>
              <View style={[styles.labelBox, { width: "25%" }]}><Text>What I noticed</Text></View>
              <View style={{ width: "75%", height: 40, padding: 8 }}><Text>{data.noticed}</Text></View>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.labelBox, { width: "25%" }]}><Text>What I will keep</Text></View>
              <View style={{ width: "75%", height: 40, padding: 8 }}><Text>{data.keep}</Text></View>
            </View>
          </View>
          <Footer />
        </Page>
      </Document>
    );
  }

  // 5. EVERYDAY GUIDES
  if (isGuides && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="GUIDES" />
          <NaflarLogo />
          <Text style={styles.title}>Everyday Nutrition Guides</Text>
          <Text style={styles.subtitle}>Simple tools for your kitchen</Text>

          <Text style={styles.pillHeader}>THE NAFLAR PLATE</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "25%" }]}><Text>Part of the plate</Text></View>
              <View style={[styles.tableCol, { width: "75%", borderRightWidth: 0 }]}><Text>What goes here</Text></View>
            </View>
            {data.plate?.map((row: any, i: number) => (
              <View key={i} style={[styles.tableRow, i === data.plate.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "25%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{row.part}</Text></View>
                <View style={[styles.tableCol, { width: "75%", borderRightWidth: 0 }]}><Text>{row.text}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>SIMPLE MEAL IDEAS</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Meal</Text></View>
              <View style={[styles.tableCol, { width: "80%", borderRightWidth: 0 }]}><Text>Ideas</Text></View>
            </View>
            {data.meals?.map((row: any, i: number) => (
              <View key={i} style={[styles.tableRow, i === data.meals.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "20%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{row.meal}</Text></View>
                <View style={[styles.tableCol, { width: "80%", borderRightWidth: 0 }]}><Text>{row.text}</Text></View>
              </View>
            ))}
          </View>

          <View break />
          <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
            <HeaderBar title="GUIDES" />
            <Text style={styles.pillHeader}>GROCERY CHECKLIST</Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
              <View style={{ width: "30%" }}>
                <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 4 }}>Vegetables and fruit</Text>
                {data.grocery?.veg.map((item: string, i: number) => (
                  <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>☐</Text><Text style={{ fontSize: 10 }}>{item}</Text></View>
                ))}
              </View>
              <View style={{ width: "30%" }}>
                <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 4 }}>Protein</Text>
                {data.grocery?.protein.map((item: string, i: number) => (
                  <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>☐</Text><Text style={{ fontSize: 10 }}>{item}</Text></View>
                ))}
              </View>
              <View style={{ width: "30%" }}>
                <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 4 }}>Grains and extras</Text>
                {data.grocery?.grains.map((item: string, i: number) => (
                  <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>☐</Text><Text style={{ fontSize: 10 }}>{item}</Text></View>
                ))}
              </View>
            </View>

            <Text style={styles.pillHeader}>READING A FOOD LABEL</Text>
            {data.labelReading?.map((b: string, i: number) => (
              <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{b}</Text></View>
            ))}
            <View style={{ marginBottom: 15 }} />

            <Text style={styles.pillHeader}>EATING OUT</Text>
            {data.eatingOut?.map((b: string, i: number) => (
              <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{b}</Text></View>
            ))}
            <Footer />
          </View>
        </Page>
      </Document>
    );
  }

  // 6. WORKBOOK
  if (isWorkbook && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="WORKBOOK" />
          <NaflarLogo />
          <Text style={styles.title}>My Naflar Workbook</Text>
          <Text style={styles.subtitle}>Write it. See it. Live it.</Text>

          <Text style={styles.pillHeader}>1. MY STARTING POINT</Text>
          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 10 }}>
            <View style={[styles.labelBox, { width: "15%", borderBottom: 0 }]}><Text>Name</Text></View>
            <View style={{ width: "35%", borderRight: 1, borderColor: "#e2d6bf", padding: 8 }}><Text>{data.startingPoint?.name}</Text></View>
            <View style={[styles.labelBox, { width: "15%", borderBottom: 0 }]}><Text>Date</Text></View>
            <View style={{ width: "35%", padding: 8 }}><Text>{data.startingPoint?.date}</Text></View>
          </View>
          <View style={{ flexDirection: "row", border: 1, borderColor: "#e2d6bf", marginBottom: 20 }}>
            <View style={[styles.labelBox, { width: "15%" }]}><Text>Main goal</Text></View>
            <View style={{ width: "35%", borderRight: 1, borderColor: "#e2d6bf", padding: 8 }}><Text>{data.startingPoint?.goal}</Text></View>
            <View style={[styles.labelBox, { width: "15%" }]}><Text>Target date</Text></View>
            <View style={{ width: "35%", padding: 8 }}><Text>{data.startingPoint?.targetDate}</Text></View>
          </View>

          <View style={styles.table}>
            {[
              { label: "My why (the real reason)", val: data.startingPoint?.why },
              { label: "What I have tried before", val: data.startingPoint?.tried },
              { label: "What got in the way", val: data.startingPoint?.gotInWay },
              { label: "Who can support me", val: data.startingPoint?.support }
            ].map((row, i) => (
              <View key={i} style={[styles.tableRow, i === 3 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "30%" }]}><Text>{row.label}</Text></View>
                <View style={{ width: "70%", minHeight: 30, padding: 8 }}><Text>{row.val}</Text></View>
              </View>
            ))}
          </View>

          <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 6, fontSize: 11 }}>How ready am I to change?</Text>
          {["Not ready yet", "Thinking about it", "Preparing", "Taking action", "Keeping it going"].map((item, i) => (
            <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>☐</Text><Text>{item}</Text></View>
          ))}

          <Footer />
        </Page>

        <Page size="A4" style={styles.page}>
          <HeaderBar title="WORKBOOK" />
          <Text style={styles.pillHeader}>2. MY THREE PILLARS</Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Pillar</Text></View>
              <View style={[styles.tableCol, { width: "40%" }]}><Text>What I will do</Text></View>
              <View style={[styles.tableCol, { width: "40%", borderRightWidth: 0 }]}><Text>How I will know</Text></View>
            </View>
            {[
              { label: "FEED (body)", key: "feed" },
              { label: "BALANCE (mind)", key: "balance" },
              { label: "FULFILL (purpose)", key: "fulfill" }
            ].map((p, i) => (
              <View key={i} style={[styles.tableRow, i === 2 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "20%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{p.label}</Text></View>
                <View style={[styles.tableCol, { width: "40%", minHeight: 30 }]}><Text>{data.pillars?.[p.key]?.do}</Text></View>
                <View style={[styles.tableCol, { width: "40%", borderRightWidth: 0, minHeight: 30 }]}><Text>{data.pillars?.[p.key]?.know}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>3. MY HABIT PLAN</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "25%" }]}><Text>Habit</Text></View>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>When</Text></View>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Where</Text></View>
              <View style={[styles.tableCol, { width: "35%", borderRightWidth: 0 }]}><Text>If it gets hard I will...</Text></View>
            </View>
            {[1, 2, 3, 4].map((_, i) => (
              <View key={i} style={[styles.tableRow, i === 3 ? { borderBottomWidth: 0 } : {}]}>
                {[0,1,2,3].map(cell => (
                  <View key={cell} style={[styles.tableCol, { width: cell === 3 ? "35%" : cell === 0 ? "25%" : "20%", height: 30, borderRightWidth: cell === 3 ? 0 : 1 }]} />
                ))}
              </View>
            ))}
          </View>

          <Footer />
        </Page>

        <Page size="A4" style={styles.page}>
          <HeaderBar title="WORKBOOK" />
          <Text style={styles.pillHeader}>4. WEEKLY CHECK-IN</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "10%" }]}><Text>Week</Text></View>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Feed</Text></View>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Balance</Text></View>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Fulfill</Text></View>
              <View style={[styles.tableCol, { width: "30%", borderRightWidth: 0 }]}><Text>Win / lesson</Text></View>
            </View>
            {[1, 2, 3, 4, 5, 6].map((week, i) => (
              <View key={i} style={[styles.tableRow, i === 5 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "10%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{week}</Text></View>
                <View style={[styles.tableCol, { width: "20%" }]} />
                <View style={[styles.tableCol, { width: "20%" }]} />
                <View style={[styles.tableCol, { width: "20%" }]} />
                <View style={[styles.tableCol, { width: "30%", borderRightWidth: 0 }]} />
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>5. MY NEXT STEPS</Text>
          <View style={styles.table}>
            {[
              { label: "What I will keep", val: data.nextSteps?.keep },
              { label: "What I will adjust", val: data.nextSteps?.adjust },
              { label: "My next goal", val: data.nextSteps?.nextGoal }
            ].map((row, i) => (
              <View key={i} style={[styles.tableRow, i === 2 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "30%" }]}><Text>{row.label}</Text></View>
                <View style={{ width: "70%", minHeight: 30, padding: 8 }}><Text>{row.val}</Text></View>
              </View>
            ))}
          </View>

          <Footer />
        </Page>
      </Document>
    );
  }

  // 7. CLINICAL LOG BOOK (Plain & Naflar)
  if ((isLogPlain || isLogNaflar) && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="PRE-DIABETES LOG BOOK" />
          <NaflarLogo />
          <Text style={styles.title}>Pre-Diabetes Log Book</Text>
          <Text style={styles.subtitle}>{isLogPlain ? "Plain Version" : "Naflar Version"}</Text>

          <Text style={styles.pillHeader}>1. ASSESSMENT (baseline)</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.labelBox, { width: "25%" }]}><Text>Height</Text></View>
              <View style={{ width: "25%", padding: 6 }}><Text>{data.height}</Text></View>
              <View style={[styles.labelBox, { width: "25%" }]}><Text>Weight</Text></View>
              <View style={{ width: "25%", padding: 6 }}><Text>{data.weight}</Text></View>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.labelBox, { width: "25%" }]}><Text>BMI</Text></View>
              <View style={{ width: "25%", padding: 6 }}><Text>{data.bmi}</Text></View>
              <View style={[styles.labelBox, { width: "25%" }]}><Text>Waist</Text></View>
              <View style={{ width: "25%", padding: 6 }}><Text>{data.waist}</Text></View>
            </View>
          </View>

          <View style={styles.table}>
            {[
              { label: "Medical history / family history of diabetes", val: data.medical_history_family_history_of_diabetes },
              { label: "Medicines and supplements", val: data.medicines_and_supplements },
              { label: "Usual meals and snacks", val: data.usual_meals_and_snacks },
              { label: "Sweet drinks and sweets per week", val: data.sweet_drinks_and_sweets_per_week },
              { label: "Physical activity", val: data.physical_activity },
              { label: "Sleep and stress", val: data.sleep_and_stress }
            ].map((row, i) => (
              <View key={i} style={[styles.tableRow, i === 5 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "40%" }]}><Text>{row.label}</Text></View>
                <View style={{ width: "60%", padding: 6, minHeight: 20 }}><Text>{row.val}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>2. NUTRITION DIAGNOSIS</Text>
          <Text style={{ fontSize: 9, marginBottom: 10 }}>Write as: Problem related to cause as evidenced by signs and symptoms.</Text>
          <View style={styles.table}>
            {["Problem", "Related to", "As evidenced by"].map((row, i) => (
              <View key={i} style={[styles.tableRow, i === 2 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "30%" }]}><Text>{row}</Text></View>
                <View style={{ width: "70%", padding: 6, minHeight: 20 }}><Text>{data[row.toLowerCase().replace(/ /g, "_")]}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>3. INTERVENTION (my plan)</Text>
          <View style={styles.table}>
            {["Goal", "How I will do it", "By when"].map((row, i) => (
              <View key={i} style={[styles.tableRow, i === 2 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "30%" }]}><Text>{row}</Text></View>
                <View style={{ width: "70%", padding: 6, minHeight: 20 }}><Text>{data[row.toLowerCase().replace(/ /g, "_")]}</Text></View>
              </View>
            ))}
          </View>
          <View style={{ marginTop: 10 }}>
            {["Meal plan given", "Carbohydrate portions and spread across the day reviewed", "Sweet drinks reviewed", "Activity plan agreed", "Sleep and stress habits discussed"].map((k, i) => (
              <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>{data[`check_${i}`] ? "☑" : "☐"}</Text><Text>{k}</Text></View>
            ))}
          </View>

          <Text style={styles.pillHeader}>4. MONITORING (results over time)</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "20%" }]}><Text>Measure</Text></View>
              <View style={[styles.tableCol, { width: "16%" }]}><Text>Baseline</Text></View>
              <View style={[styles.tableCol, { width: "16%" }]}><Text>Target</Text></View>
              <View style={[styles.tableCol, { width: "16%" }]}><Text>Check 1</Text></View>
              <View style={[styles.tableCol, { width: "16%" }]}><Text>Check 2</Text></View>
              <View style={[styles.tableCol, { width: "16%", borderRightWidth: 0 }]}><Text>Check 3</Text></View>
            </View>
            {["HbA1c", "Fasting glucose", "Weight", "Waist", "Blood pressure", "Other"].map((m, i) => (
              <View key={i} style={[styles.tableRow, i === 5 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "20%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{m}</Text></View>
                <View style={[styles.tableCol, { width: "16%" }]} /><View style={[styles.tableCol, { width: "16%" }]} /><View style={[styles.tableCol, { width: "16%" }]} /><View style={[styles.tableCol, { width: "16%" }]} /><View style={[styles.tableCol, { width: "16%", borderRightWidth: 0 }]} />
              </View>
            ))}
          </View>
          
          <Text style={{ fontSize: 8, color: "#8a5a44", marginTop: 10 }}>
            Reference ranges (ADA) for pre-diabetes: HbA1c 5.7–6.4%; fasting glucose 100–125 mg/dL. Diabetes is diagnosed from 6.5% HbA1c or 126 mg/dL fasting.
          </Text>
          <Footer />
        </Page>

        <Page size="A4" style={styles.page}>
          <HeaderBar title="PRE-DIABETES LOG BOOK" />
          <Text style={styles.pillHeader}>DAILY LOG</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, { width: "10%" }]}><Text>Day</Text></View>
              <View style={[styles.tableCol, { width: "12%" }]}><Text>Fasting glucose</Text></View>
              <View style={[styles.tableCol, { width: "15%" }]}><Text>Breakfast</Text></View>
              <View style={[styles.tableCol, { width: "15%" }]}><Text>Lunch</Text></View>
              <View style={[styles.tableCol, { width: "15%" }]}><Text>Dinner</Text></View>
              <View style={[styles.tableCol, { width: "13%" }]}><Text>Snacks & drinks</Text></View>
              <View style={[styles.tableCol, { width: "10%" }]}><Text>Water</Text></View>
              <View style={[styles.tableCol, { width: "10%", borderRightWidth: 0 }]}><Text>Activity</Text></View>
            </View>
            {[1,2,3,4,5,6,7].map((d, i) => (
              <View key={i} style={[styles.tableRow, i === 6 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.tableCol, { width: "10%", backgroundColor: "#f7f1e6" }]}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>Day {d}</Text></View>
                <View style={[styles.tableCol, { width: "12%", height: 25 }]} /><View style={[styles.tableCol, { width: "15%" }]} /><View style={[styles.tableCol, { width: "15%" }]} /><View style={[styles.tableCol, { width: "15%" }]} /><View style={[styles.tableCol, { width: "13%" }]} /><View style={[styles.tableCol, { width: "10%" }]} /><View style={[styles.tableCol, { width: "10%", borderRightWidth: 0 }]} />
              </View>
            ))}
          </View>
          <Footer />
        </Page>
      </Document>
    );
  }

  // 8. NUTRITION ASSESSMENT FORM
  if (isAssessment && data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <HeaderBar title="NUTRITION ASSESSMENT" />
          <NaflarLogo />
          <Text style={styles.title}>Nutrition Assessment</Text>
          <Text style={styles.subtitle}>Nutrition Care Process (NCP) · Feed · Balance · Fulfill</Text>

          <Text style={styles.pillHeader}>Client Information</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", border: 1, borderColor: "#e2d6bf", marginBottom: 20 }}>
            {["Name", "File no.", "Age / Sex", "Date of assessment", "Contact", "Occupation", "Referred by", "Assessor"].map((k, i) => (
              <View key={i} style={{ width: "50%", flexDirection: "row", borderBottom: i === 6 || i === 7 ? 0 : 1, borderColor: "#e2d6bf", borderRight: i % 2 === 0 ? 1 : 0 }}>
                <View style={{ width: "40%", backgroundColor: "#f7f1e6", padding: 6 }}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{k}</Text></View>
                <View style={{ width: "60%", padding: 6 }}><Text>{data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")]}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>1. NUTRITION ASSESSMENT (A. Feed)</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", border: 1, borderColor: "#e2d6bf", marginBottom: 20 }}>
            {["Height", "Weight", "BMI", "Waist / Hip", "Usual weight", "Goal weight", "Weight change", "Body fat"].map((k, i) => (
              <View key={i} style={{ width: "25%", borderBottom: i >= 4 ? 0 : 1, borderColor: "#e2d6bf", borderRight: i % 4 !== 3 ? 1 : 0 }}>
                <View style={{ backgroundColor: "#f7f1e6", padding: 6 }}><Text style={{ color: "#a8475a", fontWeight: "bold" }}>{k}</Text></View>
                <View style={{ padding: 6, height: 25 }}><Text>{data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")]}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>B. BALANCE (Mind & Lifestyle)</Text>
          <View style={styles.table}>
            {["Sleep (hours, quality)", "Stress level (1-10)", "Physical activity", "Work / family schedule", "Meal timing routine", "Support at home"].map((k, i) => (
              <View key={i} style={[styles.tableRow, i === 5 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "35%" }]}><Text>{k}</Text></View>
                <View style={{ width: "65%", padding: 6, minHeight: 20 }}><Text>{data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")]}</Text></View>
              </View>
            ))}
          </View>

          <Text style={styles.pillHeader}>C. FULFILL (Purpose & Spirit)</Text>
          <View style={styles.table}>
            {["What does a healthy life mean to you?", "What is your deeper reason for change?", "Faith or routines that support you"].map((k, i) => (
              <View key={i} style={[styles.tableRow, i === 2 ? { borderBottomWidth: 0 } : {}]}>
                <View style={[styles.labelBox, { width: "35%" }]}><Text>{k}</Text></View>
                <View style={{ width: "65%", padding: 6, minHeight: 20 }}><Text>{data[k.toLowerCase().replace(/ /g, "_").replace(/\?/g, "")]}</Text></View>
              </View>
            ))}
          </View>

          <Text style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 6, fontSize: 11 }}>Readiness to change:</Text>
          {["Not ready", "Thinking about it", "Preparing", "Taking action", "Maintaining"].map((k, i) => (
            <View key={i} style={styles.checkRow}><Text style={{ marginRight: 6, fontSize: 12 }}>{data[`readiness_${i}`] ? "☑" : "☐"}</Text><Text>{k}</Text></View>
          ))}
          
          <Footer />
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>Resource not found or unsupported.</Text>
      </Page>
    </Document>
  );
}