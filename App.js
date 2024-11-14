import React, { 
    useState } from 'react';
   import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    ScrollView } from 'react-native';
   import { 
    Picker } from '@react-native-picker/picker';
   
   type MenuItem = {
    name: string;
    description: string;
    course: string;
    price: number;
   };
   
   export default function App() {
    const [currentScreen, setCurrentScreen] = useState('Home');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [price, setPrice] = useState('');
    const [menuItems, setMenuItems] = useState([]); 
    const [selectedCourse, setSelectedCourse] = useState('All'); 
    
    const handleSave = () => {
      if (!name || !description || !course || !price) {
        alert('Please fill out all fields.');
        return;
      }
   
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        alert('Please enter a valid price greater than zero.');
        return;
      }
   
      const newItem: MenuItem = {
        name,
        description,
        course,
        price: parsedPrice,
      };
   
      setMenuItems([...menuItems, newItem]);
      setName('');
      setDescription('');
      setCourse('');
      setPrice('');
    };
   
    const handleDeleteAll = () => {
       setMenuItems([]); 
       alert('All menu items have been deleted.');
     };
   
    const renderHomeScreen = () => {
      const calculateAveragePrice = (course: string) => {
        const filteredItems = menuItems.filter(item => item.course === course);
        if (filteredItems.length === 0) return '0.00';
        
        const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);
        return (totalPrice / filteredItems.length).toFixed(2);
      };
   
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Image 
              source={require('./assets/logo.png')} 
               style={styles.image} 
             />
            <Text style={styles.title}>Food Feod</Text>
          </View>
          <View style={styles.stats}>
            <Text>Total number of menu items: {menuItems.length}</Text>
            <Text>Average price for Starters: R{calculateAveragePrice('Starter')}</Text>
            <Text>                              Main Course: R{calculateAveragePrice('Main Course')}</Text>
            <Text>                              Desserts: R{calculateAveragePrice('Dessert')}</Text>
          </View>
          <Text style={styles.sectionTitle}>Prepared Menu</Text>
          {menuItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>{item.course}</Text>
                <Text>R{item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    };
   
    const renderEditMenuScreen = () => (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image 
              source={require('./assets/logo.png')} 
               style={styles.image} 
             />
          <Text style={styles.title}>Food Feod</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter name of food"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            style={styles.picker}
            onValueChange={(itemValue) => setCourse(itemValue)}
          >
            <Picker.Item label="Select Course" value="" />
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAll}>
           <Text style={styles.deleteButtonText}>Delete All Menu Items</Text>
         </TouchableOpacity>
      </ScrollView>
    );
   
    const renderMenuScreen = () => {
      const hardCodedMenuItems: MenuItem[] = [
        // Starters
        { name: "Bruschetta", description: "Crispy Italian bread topped with fresh tomatoes, basil, and drizzled with balsamic glaze.", course: "Starter", price: 60 },
        { name: "Stuffed Mushrooms", description: "Juicy mushrooms filled with a savory mixture of cheese, herbs, and breadcrumbs.", course: "Starter", price: 70 },
        { name: "Calamari Rings", description: "Tender calamari rings, lightly battered and fried, served with a tangy lemon aioli.", course: "Starter", price: 85 },
        { name: "Caprese Salad", description: "Fresh mozzarella, ripe tomatoes, and basil leaves, drizzled with olive oil and balsamic vinegar.", course: "Starter", price: 70 },
        { name: "Chicken Satay", description: "Grilled marinated chicken skewers served with a spicy peanut dipping sauce.", course: "Starter", price: 80 },
        { name: "Garlic Prawns", description: "Succulent prawns sautéed in garlic butter, served with a slice of lemon.", course: "Starter", price: 95 },
        { name: "Spring Rolls", description: "Crispy spring rolls stuffed with vegetables and served with a sweet chili dipping sauce.", course: "Starter", price: 60 },
   
        // Main Course
        { name: "Grilled Ribeye Steak", description: "250g Tender ribeye steak, grilled to perfection, served with steamed vegetables.", course: "Main Course", price: 180 },
        { name: "Lamb Shank", description: "Slow-cooked lamb shank in a rich red wine sauce, served with roasted root vegetables.", course: "Main Course", price: 200 },
        { name: "Chicken Alfredo Pasta", description: "Creamy fettuccine pasta tossed with mushrooms and parmesan cheese.", course: "Main Course", price: 130 },
        { name: "Grilled Salmon", description: "Fresh salmon fillet, grilled and served with a lemon butter sauce and asparagus.", course: "Main Course", price: 200 },
        { name: "Beef Burger", description: "Juicy beef patty with lettuce, tomato, cheese, and house sauce, served with fries.", course: "Main Course", price: 120 },
        { name: "Chicken Tikka Masala", description: "Marinated chicken cooked in a rich and creamy tomato sauce, served with basmati rice.", course: "Main Course", price: 140 },
        { name: "Seafood Paella", description: "Spanish-style rice dish with saffron, shrimp, mussels, and squid.", course: "Main Course", price: 220 },
        { name: "Vegetable Stir-Fry", description: "Mixed vegetables sautéed in a soy-ginger sauce, served with jasmine rice.", course: "Main Course", price: 110 },
   
        // Desserts
        { name: "Tiramisu", description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.", course: "Dessert", price: 75 },
        { name: "Chocolate Lava Cake", description: "Rich chocolate cake with a gooey molten center.", course: "Dessert", price: 80 },
        { name: "Cheesecake", description: "Creamy New York-style cheesecake with a graham cracker crust.", course: "Dessert", price: 25 },
        { name: "Crème Brûlée", description: "Smooth and creamy custard with a caramelized sugar top.", course: "Dessert", price: 90 },
        { name: "Panna Cotta", description: "Silky Italian dessert made with sweetened cream and topped with a berry sauce.", course: "Dessert", price: 80 },
        { name: "Banoffee Pie", description: "Rich and creamy pie with layers of banana, caramel, and whipped cream, served on a buttery biscuit base.", course: "Dessert", price: 75 },
        { name: "Churros", description: "Crispy fried dough sticks rolled in cinnamon sugar, served with a chocolate dipping sauce.", course: "Dessert", price: 65 },
      ];
   
      const filteredItems = selectedCourse === 'All'
        ? hardCodedMenuItems
        : hardCodedMenuItems.filter(item => item.course === selectedCourse);
   
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Image 
              source={require('./assets/logo.png')} 
               style={styles.image} 
             />
            <Text style={styles.title}>Food Feod</Text>
          </View>
          
          {/* Course Selection Buttons */}
          <View style={styles.navBar}>
            {['All', 'Starter', 'Main Course', 'Dessert'].map((courseOption) => (
              <TouchableOpacity
                key={courseOption}
                style={[
                  styles.navButton,
                  selectedCourse === courseOption && styles.navButtonSelected,
                ]}
                onPress={() => setSelectedCourse(courseOption)}
              >
                <Text style={styles.navButtonText}>
                  {courseOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
   
          {/* Displaying Filtered Menu Items */}
          <Text style={styles.sectionTitle}>{selectedCourse} Items</Text>
          {filteredItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>R{item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    };
   
    return (
      <View style={styles.container}>
        {currentScreen === 'Home' && renderHomeScreen()}
        {currentScreen === 'EditMenu' && renderEditMenuScreen()}
        {currentScreen === 'Menu' && renderMenuScreen()}
   
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.button}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('EditMenu')} style={styles.button}>
            <Text>Edit Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('Menu')} style={styles.button}>
            <Text>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
   }
   
   const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    image: {
     width: 100,
     height: 100,
     borderRadius: 10,  
   },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    stats: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
    navButton: {
      padding: 10,
      backgroundColor: '#E8F1F2',
      borderRadius: 8,
    },
    navButtonSelected: {
      backgroundColor: '#C1D8C3',
    },
    navButtonText: {
      fontSize: 16,
      color: '#000',
    },
    menuItem: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderBottomColor: '#ccc',
      marginBottom: 20,
    },
    itemDetails: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    button: {
      backgroundColor: '#D3D3D3',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 10,
      overflow: 'hidden', 
      backgroundColor: '#fff', 
      elevation: 3, 
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    picker: {
      height: 40,
      width: '100%',
      backgroundColor: '#f8f9fa', 
      color: '#333', 
      paddingHorizontal: 10, 
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#F8F8F8',
      borderTopWidth: 1,
      borderColor: '#E0E0E0',
    },
    deleteButton: {
       backgroundColor: '#603F26',
     },
     deleteButtonText: {
       color: '#fff',
       fontWeight: 'bold',
     },
   });
