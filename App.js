/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
  TextInput,
} from "react-native";

const windowwidth = Dimensions.get("window").width;

const initialBooks = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tales_serial.jpg",
    book: "İki Şehrin Hikâyesi",
    info: "Ünlü İngiliz yazar Charles Dickens'ın yazdığı tarihi bir romandır. Roman, Fransız Devrimi'nin patlak verdiği dönemde Londra ile Paris arasında geçen olayları konu alır. Aşk, ihanet, adalet ve kurtuluş temalarını işleyen eser, Fransız Devrimi'nin sosyal ve politik atmosferini canlı bir şekilde yansıtır.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/thumb/f/f5/Kucukprens.jpg/293px-Kucukprens.jpg",
    book: "Küçük Prens",
    info: "Antoine de Saint-Exupéry tarafından yazılmış ünlü bir masal kitabıdır. Kitap, bir pilotun çölde bir çocukla karşılaşmasını ve çocuğun gezegeninden geldiğini iddia etmesini konu alır. Prens, insan ilişkileri, arkadaşlık ve insan doğasına dair derin düşünceler sunar.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/thumb/b/b4/Harry_Potter_ve_Felsefe_Ta%C5%9F%C4%B1_2.jpg/331px-Harry_Potter_ve_Felsefe_Ta%C5%9F%C4%B1_2.jpg",
    book: "Harry Potter ve Felsefe Taşı",
    info: "J.K. Rowling tarafından yazılmış ve Harry Potter serisinin ilk kitabıdır. Kitap, genç bir büyücü olan Harry Potter'ın, Hogwarts Cadılık ve Büyücülük Okulu'na girişiyle başlayan maceralarını anlatır. Hogwarts'ta dostluklar kurar, büyülü dünyayı keşfeder ve karanlık büyücü Lord Voldemort'un izini sürer. Roman, büyüleyici dünyası, eğlenceli karakterleri ve derin temalarıyla geniş bir okuyucu kitlesine hitap eder.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/7/71/Hobbit_Kapak.jpg",
    book: "Hobbit",
    info: "J.R.R. Tolkien tarafından yazılmış fantastik bir roman serisinin ilk kitabıdır. Orta Dünya'da geçen hikaye, küçük bir hobbit olan Bilbo Baggins'in, cücelerle birlikte Ejderha Smaug'un hüküm sürdüğü Erebor Dağı'na doğru maceralı bir yolculuğuna odaklanır. Bilbo'nun karşılaştığı tehlikeler, dostlukları ve maceraları, kitabın temelini oluşturur. Tolkien'in yaratıcı dünyası ve karakterleri, okuyucuları büyüleyen bir atmosfer sunar.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Sun_Wen_Red_Chamber_10.jpg/480px-Sun_Wen_Red_Chamber_10.jpg",
    book: "Kızıl Köşkün Rüyası",
    info: " Fyodor Dostoyevski tarafından yazılmış bir romandır. Eserde, genç bir Rus subayının, Petersburg'daki Kızıl Köşk'te yaşadığı yoğun ve karmaşık rüyaları anlatır. Rüyalar, subayın iç dünyasının derinliklerine inerek insan psikolojisi ve varoluşsal temaları ele alır. Roman, Dostoyevski'nin karakter analizi ve felsefi düşünceleriyle dolu bir eseridir.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/thumb/6/6c/On_Ki%C5%9Fiydiler_kapa%C4%9F%C4%B1.jpg/331px-On_Ki%C5%9Fiydiler_kapa%C4%9F%C4%B1.jpg",
    book: "On Kişiydiler",
    info: "Agatha Christie tarafından yazılmış ünlü bir dedektif romanıdır. Eser, bir grup yabancının gizemli bir ada malikanesinde bir araya gelmesi ve birbirlerini tanıdıkça geçmişlerindeki sırların ortaya çıkmasıyla şekillenen bir hikayeyi anlatır. Roman, gerilim dolu atmosferi ve beklenmedik sonuyla okuyucuları şaşırtmayı başaran klasik bir polisiye eserdir.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/thumb/c/ca/Aslan_Cad%C4%B1_ve_Dolap.png/299px-Aslan_Cad%C4%B1_ve_Dolap.png",
    book: "Aslan, Cadı ve Dolap",
    info: "C.S. Lewis'in yazdığı ve 'Narnia Günlükleri' serisinin ikinci kitabı olan fantastik bir roman. Kitap, dört kardeşin gizemli bir dolap aracılığıyla fantastik bir dünya olan Narnia'ya ulaşmasını ve burada Aslan adlı bir aslanın liderliğinde yaşanan maceraları anlatır. İyilik ve kötülük arasındaki mücadele, dostluk ve cesaret gibi temaları işleyen eser, çocuklar için klasikleşmiş bir fantastik hikayelerden biridir.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/6/69/Ayi%C5%9Fe.jpg",
    book: "Ayişe",
    info: "Türk yazar Mustafa Kutlu'nun ünlü eserlerinden biridir. Roman, Anadolu'nun sade yaşamını ve insan ilişkilerini ele alırken, içsel bir dönüşümü de anlatır. Ayi̇şe karakteri etrafında şekillenen hikaye, geleneksel ve modern değerler arasındaki çatışmayı işlerken, insanın kendini bulma ve hayatın anlamını sorgulama sürecini aktarıyor.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/0/0b/Da_Vinci_%C5%9Eifresi.jpg",
    book: "Da Vinci Şifresi",
    info: "Amerikalı yazar Dan Brown tarafından yazılmış bir roman ve aynı isimli 2003 yapımı bir filmdir. Kitap, din, tarih ve sanat üzerine yoğunlaşarak gizemli bir kurgu sunar. Hikaye, Harvard semboloji profesörü Robert Langdon'ın, Louvre Müzesi'nde işlenen bir cinayetin ardından şifreleri ve gizemleri çözmeye çalışmasını anlatır. Roman, Hristiyanlık tarihini sorgulayan ve gizli örgütlerin izini süren bir serüven sunar, büyük bir tartışma yaratmıştır.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/tr/d/d4/Simyac%C4%B1.jpg",
    book: "Simyacı",
    info: "Brezilyalı yazar Paulo Coelho'nun en ünlü eserlerinden biridir. Kitap, Santiago adında genç bir İspanyol çobanın keşif ve kişisel dönüşüm yolculuğunu konu alır. Santiago, hazine arayışı sırasında kendini bulurken, hayatın gerçek değerlerini ve insanın içsel gücünü keşfeder. Eser, kişisel hedeflere ulaşma, cesaret, ve kaderin yön verici gücü üzerine derin düşünceler sunar.",
  },
];

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState(initialBooks);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newInfo, setNewInfo] = useState("");

  const addNewBook = () => {
    if (newImageUrl && newInfo) {
      const newBook = { img: newImageUrl, book: "", info: newInfo };
      setBooks([...books, newBook]);
      setNewImageUrl("");
      setNewInfo("");
    }
  };

  const removeBook = (index: number) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Dünya Çapında En Çok Satan Kitaplar</Text>
      <ScrollView>
        {books.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedBook(item)}
            style={{ marginBottom: 10 }}
          >
            <Image
              source={{ uri: item.img }}
              style={{
                width: windowwidth - 10,
                height: 600,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <View style={[styles.button, styles.buttonOpen]}>
                <Text style={styles.textStyle}>BİLGİ</Text>
              </View>
              <Pressable
                onPress={() => removeBook(index)}
                style={[styles.button, styles.buttonClose]}
              >
                <Text style={styles.textStyle}>SİL</Text>
              </Pressable>
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 15,
              }}
            >
              <Text style={styles.bookName}>{item.book}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Resim URL'sini Giriniz"
          style={styles.input}
          value={newImageUrl}
          onChangeText={setNewImageUrl}
        />
        <TextInput
          placeholder="Kitap Özetini Giriniz"
          style={styles.input}
          value={newInfo}
          onChangeText={setNewInfo}
        />
        <Pressable onPress={addNewBook} style={styles.addButton}>
          <Text style={styles.buttonText}>Resim Ekle</Text>
        </Pressable>
      </View>
      {selectedBook && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredModal}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{selectedBook.info}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setSelectedBook(null)}
              >
                <Text style={styles.textStyle}>KAPAT</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  titleStyle: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: "black",
  },
  bookName: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "#363636",
    padding: 5,
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 70,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#363636",
  },
  buttonClose: {
    backgroundColor: "#862c1d",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  addButton: {
    backgroundColor: "#0a5c0a",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
