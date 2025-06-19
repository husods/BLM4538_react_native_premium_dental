import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
// @ts-ignore
import { Picker } from "@react-native-picker/picker";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function HomeScreen() {
  const user = getAuth().currentUser;
  const router = useRouter();
  // Burada today'yi tanımla
  const today = new Date();
  const normalizeDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const normalizedToday = normalizeDate(new Date());

  today.setHours(0, 0, 0, 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [currentDate, setCurrentDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [pastAppointments, setPastAppointments] = useState<any[]>([]);
  const procedures = [
    "Diş Taşı Temizliği",
    "Dolgu",
    "Kontrol",
    "Kanal Tedavisi",
  ];

  useEffect(() => {
    const fetchBookedTimes = async () => {
      const db = getFirestore(firebaseApp);
      const dateString = currentDate.toISOString().split("T")[0];
      const q = query(
        collection(db, "appointments"),
        where("date", "==", dateString)
      );
      const snapshot = await getDocs(q);
      const taken = snapshot.docs.map((doc) => doc.data().time);
      setBookedTimes(taken);
    };

    const fetchUserAppointments = async () => {
      const db = getFirestore(firebaseApp);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split("T")[0];
      const currentTime = today.toTimeString().slice(0, 5);

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(
        query(collection(db, "appointments"), where("uid", "==", user.uid))
      );

      const all = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      const upcoming = all.filter(
        (item) =>
          item.date > todayStr ||
          (item.date === todayStr && item.time >= currentTime)
      );
      const past = all.filter((item) => item.date < todayStr);

      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
    };

    fetchBookedTimes();
    fetchUserAppointments();
  }, [currentDate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topRow}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/announcements")}>
            <Ionicons name="notifications-outline" size={28} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
      </View>

      {user?.displayName && (
        <Text style={styles.welcomeText}>Hoş geldiniz, {user.displayName}</Text>
      )}

      <TouchableOpacity
        style={styles.newAppointmentButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.newAppointmentText}>Yeni Randevu Al</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Randevu Al</Text>

            <Text style={{ marginTop: 10 }}>İşlem Türü</Text>
            <Picker
              selectedValue={selectedProcedure}
              onValueChange={(itemValue: string) =>
                setSelectedProcedure(itemValue)
              }
            >
              <Picker.Item label="Seçiniz..." value="" />
              {procedures.map((proc, i) => (
                <Picker.Item key={i} label={proc} value={proc} />
              ))}
            </Picker>

            <View style={styles.dateNavRow}>
              <TouchableOpacity
                disabled={normalizeDate(currentDate) <= normalizedToday}
                onPress={() => {
                  const prev = new Date(currentDate);
                  prev.setDate(prev.getDate() - 1); // önce tarihi 1 gün geriye al
                  const normalizedPrev = normalizeDate(prev);
                  if (normalizedPrev <= normalizedToday) return; // eğer bugünden küçükse işlemi durdur
                  setCurrentDate(prev); // değilse tarih güncelle
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={
                    normalizeDate(currentDate) <= normalizedToday
                      ? "#ccc"
                      : "#007AFF"
                  }
                />
              </TouchableOpacity>

              <Text style={styles.dateText}>
                {currentDate.toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const next = new Date(currentDate);
                  next.setDate(next.getDate() + 1);
                  setCurrentDate(next);
                }}
              >
                <Ionicons name="chevron-forward" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.timeGrid}>
              {timeSlots.map((slot, i) => {
                const isTaken = bookedTimes.includes(slot);
                return (
                  <TouchableOpacity
                    key={i}
                    disabled={isTaken}
                    onPress={() => setSelectedTime(slot)}
                    style={[
                      styles.timeSlot,
                      isTaken
                        ? styles.timeTaken
                        : selectedTime === slot
                        ? styles.timeSelected
                        : styles.timeAvailable,
                    ]}
                  >
                    <Text
                      style={{
                        color: isTaken
                          ? "#888"
                          : selectedTime === slot
                          ? "#fff"
                          : "#007AFF",
                        fontWeight: "500",
                      }}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={async () => {
                console.log("Randevu onayla butonuna basıldı");
                if (!selectedProcedure || !selectedTime) {
                  alert("Lütfen işlem türü ve saat seçiniz.");
                  return;
                }
                if (!selectedProcedure || !selectedTime) {
                  alert("Lütfen işlem türü ve saat seçiniz.");
                  return;
                }

                const db = getFirestore(firebaseApp);
                const dateString = currentDate.toISOString().split("T")[0];

                try {
                  const auth = getAuth();
                  const user = auth.currentUser;
                  if (!user) return;

                  await addDoc(collection(db, "appointments"), {
                    uid: user.uid,
                    name: user.displayName || "Bilinmeyen Kullanıcı",
                    date: dateString,
                    time: selectedTime,
                    procedure: selectedProcedure,
                    createdAt: new Date().toISOString(),
                  });

                  Alert.alert("Başarılı", "Randevunuz başarıyla oluşturuldu.", [
                    {
                      text: "Tamam",
                      onPress: () => {
                        setModalVisible(false);
                        setUpcomingAppointments((prev) => [
                          ...prev,
                          {
                            id: Math.random().toString(36).substring(7),
                            date: dateString,
                            time: selectedTime,
                            procedure: selectedProcedure,
                            name: user.displayName || "Bilinmeyen Kullanıcı",
                          },
                        ]);
                        setBookedTimes((prev) => [...prev, selectedTime]);
                      },
                    },
                  ]);
                } catch (error) {
                  alert("Randevu kaydedilemedi. Hata: " + error);
                }
              }}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmText}>Randevuyu Onayla</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#007AFF",
                  fontWeight: "500",
                }}
              >
                İptal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.sectionTitle}>Yaklaşan Randevular</Text>
      {upcomingAppointments.length === 0 ? (
        <Text style={styles.emptyText}>Yaklaşan randevu bulunmamaktadır.</Text>
      ) : (
        upcomingAppointments.map((appt) => (
          <View key={appt.id} style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.cardText}>
                  {appt.date} - {appt.time}
                </Text>
                <Text style={styles.cardText}>
                  {appt.procedure || "İşlem belirtilmemiş"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  Alert.alert(
                    "Onay",
                    "Randevuyu iptal etmek istediğinizden emin misiniz?",
                    [
                      { text: "Vazgeç", style: "cancel" },
                      {
                        text: "Evet",
                        style: "destructive",
                        onPress: async () => {
                          const db = getFirestore(firebaseApp);
                          await deleteDoc(doc(db, "appointments", appt.id));
                          setBookedTimes((prev) =>
                            prev.filter((time) => time !== appt.time)
                          );
                          setUpcomingAppointments((prev) =>
                            prev.filter((item) => item.id !== appt.id)
                          );
                        },
                      },
                    ]
                  );
                }}
              >
                <Text style={{ color: "red", fontWeight: "600" }}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Geçmiş Randevular</Text>
      {pastAppointments.length === 0 ? (
        <Text style={styles.emptyText}>Geçmiş randevu bulunmamaktadır.</Text>
      ) : (
        pastAppointments.map((appt) => (
          <View key={appt.id} style={[styles.card, styles.pastCard]}>
            <Text style={styles.cardText}>
              {appt.date} - {appt.time}
            </Text>
            <Text style={styles.cardText}> {appt.procedure}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 16 },
  topContainer: { marginTop: 12, marginBottom: 12 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logoWrapper: {
    width: 110,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logo: { width: "100%", height: "100%" },
  divider: {
    height: 1,
    backgroundColor: "#CED4DA",
    marginTop: 8,
    marginHorizontal: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
    color: "#007AFF",
    paddingHorizontal: 16,
  },
  newAppointmentButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  newAppointmentText: { color: "#fff", fontWeight: "bold" },
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  dateNavRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  dateText: { fontSize: 16, fontWeight: "500" },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
    justifyContent: "center",
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  timeAvailable: { backgroundColor: "#F0F8FF" },
  timeSelected: { backgroundColor: "#007AFF" },
  timeTaken: { backgroundColor: "#ccc" },
  confirmButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmText: { color: "white", textAlign: "center", fontWeight: "bold" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#007AFF",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    paddingHorizontal: 16,
    marginBottom: 12,
    fontStyle: "italic",
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    backgroundColor: "#F0F8FF",
  },
  pastCard: {
    backgroundColor: "#F2F2F2", // açık gri
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#B0B0B0", // gri vurgu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  cardText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});
