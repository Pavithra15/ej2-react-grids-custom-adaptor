/* tslint:disable*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    GridComponent,Page,Sort,ColumnsDirective,ColumnDirective,
    Inject
} from '@syncfusion/ej2-react-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import './App.css';


class customeAdaptor extends WebApiAdaptor {
    processResponse(): Object {
        let response:any = super.processResponse.apply(this, arguments);
        let original: {result: Object[], count: number} = {result:response.data,count:response.recordsTotal};
        return { result: original.result, count: original.count };
    }
}
export default class App extends React.Component<{}, {}> {
    public data = new DataManager({
        url: 'http://88.255.153.26:20000/api/cargorequest',
        adaptor: new customeAdaptor
    });

    render() {
        return (
            <GridComponent dataSource={this.data} allowPaging={true} allowSorting={true}>
                 <ColumnsDirective>
                            <ColumnDirective field='cargoRequestID' headerText='ID' width='120' ></ColumnDirective>
                            <ColumnDirective field='requestDate' headerText='Date' format='yMd' width='160'></ColumnDirective>
                            <ColumnDirective field='inOut' headerText='inOut' width='120' format='C2' />
                        </ColumnsDirective>
                <Inject services={[Page, Sort]} />
            </GridComponent>

        );
    }
}
ReactDOM.render(<App />, document.getElementById('grid'));