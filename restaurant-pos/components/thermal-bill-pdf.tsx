import { OrderPayment } from "@/types/payment-types"
import { OrderItem } from "@/types/pos-types"
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'

interface ThermalBillPDFProps {
  order: OrderPayment
  items: OrderItem[]
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Courier',
    fontSize: 12,
    padding: 30,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
})

export function ThermalBillPDF({ order, items }: ThermalBillPDFProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <PDFViewer style={{width: '100%', height: '90vh'}}>
      <Document>
        <Page size="A6" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Coca Coffeetalk</Text>
            <Text>123 Restaurant St, Foodville</Text>
            <Text>Tel: (123) 456-7890</Text>
          </View>
          <View style={styles.section}>
            <Text>Order #: {order.orderNumber}</Text>
            <Text>Table #: {order.tableNumber}</Text>
            <Text>Date: {new Date().toLocaleString()}</Text>
          </View>
          <View style={styles.table}>
            {items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.quantity}x</Text>
                </View>
                <View style={[styles.tableCol, { width: '50%' }]}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text>Tax (10%): ${tax.toFixed(2)}</Text>
            <Text style={styles.title}>Total: ${total.toFixed(2)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={{textAlign: 'center'}}>Thank you for dining with us!</Text>
            <Text style={{textAlign: 'center'}}>Please come again</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

