import Assessment from './components/assessment'
import Question from './components/question'

function App() {
  return (
    <>
        <Assessment>
            <Question
                contextQuery="SELECT * FROM sales WHERE TRUNC(sale_date) = TRUNC(sysdate - INTERVAL '7' DAY);"
                defaultQuery='CREATE INDEX <index_name> ON <table_name> (<index_def>)'
                task='Create an index that will optimize the following query:'
            />
            <Question
                defaultQuery='CREATE INDEX <index_name> ON <table_name> (<index_def>)'
                task='Create an index that will optimize the following query:'
            />
        </Assessment>
    </>
  )
}

export default App
