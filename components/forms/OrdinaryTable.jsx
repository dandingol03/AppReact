import React from 'react';
import {render} from 'react-dom';
import Download from '../../components/basic/Download.jsx';
import OrdinaryTr from '../../components/forms/OrdinaryTr.jsx';
import EmbedTable from '../../components/forms/EmbedTable.jsx';
import '../../css/components/forms/ordinaryTable/OrdinaryTable.css';


/**
 *
 * 1.dataField,本组件支持多数据源注入,由dataField的field映射至各表数据源所对应的键
 *
 *
 */
var OrdinaryTable =React.createClass({
    clickCb:function(ob){
        if(ob!==undefined&&ob!==null)
        {
            var dataField=ob.field;
            var index=ob.index;
            if(index===null||index===undefined||dataField==null||dataField==undefined)
            {}
            else{
                if(dataField==this.state.sideField.field&&!isNaN(parseInt(index)))
                {
                    var row=this.state.data[this.state.sideField.field][index];
                    var params=Object.assign(this.state.sideField.query.params,row);
                    this.queryHandle(
                        null,
                        this.state.sideField.query.url,
                        params,
                        'json',
                        function(response){
                            console.log();
                            console.log();
                            this.setState({data:response.arr});
                        }.bind(this)
                    )

                }
            }
        }
    },
    fetch:function(){
        this.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function(response){
                this.setState({data:response,data$initialed:true});
            }.bind(this)
        )
    },
    queryHandle:function(type,url,params,dataType,callback){
        $.ajax({
            type: type!==undefined&&type!==null?type:'POST',
            url: url,
            dataType: dataType!==undefined&&dataType!==null?dataType:'json',
            data: params,
            cache: false,
            success: function(response) {
                if(callback!==undefined&&callback!==null)
                    callback(response);
            },
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    getInitialState:function(){
        //自动拉取服务器数据
        var autoFetch;
        if(this.props.autoFetch!==undefined&&this.props.autoFetch!==null)
            autoFetch=this.props.autoFetch;
        else
            autoFetch=false;

        //数据是否绑定
        var data$initialed;
        if(this.props.data!==undefined&&this.props.data!==null)
            data$initialed=true;
        else
            data$initialed=false;

        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
        data=this.props.data;

        var sideField;
        if(this.props.sideField!==undefined&&this.props.sideField!==null)
        sideField=this.props.sideField;

        var dataField;
        if(this.props.dataField!==undefined&&this.props.dataField!==null)
            dataField=this.props.dataField;

        //filterField,此选项开启后自动按照filterField的顺序进行字段填充
        var filterField;
        if(this.props.filterField!==undefined&&this.props.filterField!==null)
            filterField=this.props.filterField;


        return ({autoFetch:autoFetch,data$initialed:data$initialed,data:data,
                sideField:sideField,dataField:dataField,filterField:filterField});
    },
    componentWillReceiveProps:function(props)
    {
        //更新data$initialed状态
        if(props.data$initialed!==undefined&&props.data$initialed!==null)
            this.setState({data$initialed:props.data$initialed});
    },
    render:function(){
        if(this.state.data$initialed!==true&&(this.props.data==null||this.props.data==undefined))
        {
            if(this.state.autoFetch==true)
                this.fetch();
            return (
               <table>
               </table>
            )
        }else{
            var colSpan=1;
            var tables;
            if(this.state.dataField!==null&&this.state.dataField!==undefined)
            {
                tables=new Array();
                if(Object.prototype.toString.call(this.props.dataField)!="[object Array]")
                    return(
                        <table></table>
                    );
                var state=this.state;
                var props=this.props;
                state.dataField.map(function(item,i) {
                    var colSpan=0;
                    if(props.data[item.field]==null||props.data[item.field]==undefined||Object.prototype.toString.call(props.data[item.field])!="[object Array]")
                    {
                        return false;
                    }
                    if(props.data[item.field].length<1)
                        return false;
                    //如果内表允许堆叠
                    if(item.stacked==true)
                    {
                        var arr=new Array();
                        var json=new Object();
                        json["data"]=state.data[item.field];
                        arr.push(json);
                        tables.push(
                            <EmbedTable title={item.title}
                                        data={{arr:arr}}
                                        subQuery={{
                                            url:"/gradms/bsuims/reactPageDataRequest.do",
                                            params:{
                                                reactPageName:'cultivateTutorPage',
                                                reactActionName:"personIntroductionShow"
                                            }
                                        }}
                                        autoFetch={false} key={i}/>
                        );
                    }else{
                        var trs;
                        var rowFields=new Array();
                        for(var field in props.data[item.field][0])
                        {
                            rowFields.push(<td key={colSpan}>{field}</td>);
                            colSpan++;
                        }
                        trs=new Array();
                        props.data[item.field].map(function(row,i) {
                            var tds=new Array();
                            var j=0;
                            for(var field in row)
                            {
                                tds.push(
                                    <td key={j++}>
                                        {row[field]}
                                    </td>);
                            }
                            trs.push(
                                <tr key={i}>
                                    {tds}
                                </tr>
                            )

                        });
                        tables.push(
                            <table className="table table-bordered center ordinaryTable" key={i}>
                                <thead>
                                <tr>
                                    <th colSpan={colSpan}>{item.title}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>{rowFields}</tr>
                                {trs}
                                </tbody>
                            </table>);
                    }


                });

            }else{
                //单表数据源注入
                if(Object.prototype.toString.call(this.props.data)=="[object Array]"&&this.props.data.length>=1)
                {
                    tables=new Array();
                    colSpan=0;
                    var tr$fields=new Array();
                    var j=0;
                    var state=this.state;
                    var props=this.props;
                    if(state.filterField!==null&&state.filterField!==undefined)
                    {
                        for(var field in state.filterField)
                        {
                            if(props.data[0][field]!==null&&props.data[0][field]!==undefined)
                            {
                                tr$fields.push(<td key={j++}>{field}</td>)
                                colSpan++;
                            }
                        }
                    }else{
                        for(var field in this.props.data[0])
                        {
                            tr$fields.push(<td key={j++}>{field}</td>)
                            colSpan++;
                        }
                    }


                    var trs=new Array();

                    props.data.map(function(row,i) {
                        var k=0;
                        var tds=new Array();
                        if(state.filterField!==undefined&&state.filterField!==null)
                        {
                            for(var field in state.filterField)
                            {
                                if(row[field]!==undefined&&row[field]!==null)
                                {

                                    switch(field)
                                    {
                                        case 'attachs':

                                            var downloads=null;
                                            var ids=null;
                                            if(row[field]!==undefined&&row[field]!==null&&row[field]!='')
                                                ids=row[field].split("|");
                                            if(ids!=null&&ids.length>=1)
                                            {
                                                downloads=new Array();
                                                ids.map(function(item,i) {
                                                    downloads.push(<Download attachId={item} key={i}/>);
                                                });
                                            }


                                            tds.push(<td key={k++}>{downloads}</td>);
                                            break;
                                        default:
                                            tds.push(<td key={k++}>{row[field]}</td>);
                                            break;
                                    }


                                }

                            }
                        }
                        else{
                                for(var field in row)
                                {
                                    tds.push(<td key={k++}>{row[field]}</td>);
                                }
                        }
                        trs.push(
                            <tr key={i}>
                                {tds}
                            </tr>
                        );
                    });


                    tables.push(
                        <table className="table table-bordered center" key={0}>
                        <thead>
                        <tr>
                            <th colSpan={colSpan}>{this.props.title}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>{tr$fields}</tr>
                        {trs}
                        </tbody>
                    </table>)

                }
            }

            var sideDist;
            if(this.props.sideField!==undefined&&this.props.sideField!==null)
            {
                var sideTables;
                colSpan=0;
                var state=this.state;
                if(state.sideField.field!==undefined&&state.sideField.field!==null&&state.data[state.sideField.field]!==undefined&&state.data[state.sideField.field]!==null)
                {
                    var fields=new Array();
                    for(var field in state.data[state.sideField.field][0])
                    {
                        fields.push(<td key={colSpan}>{field}</td>);
                        colSpan++;
                    }
                    var trs=new Array();
                    var clickCb=this.clickCb;
                    state.data[state.sideField.field].map(function(row,i) {
                        var tds=new Array();
                        var j=0;

                        for(var cell in row) {
                            tds.push(
                                <td key={j++}>
                                    {row[cell]}
                                </td>);
                        }

                        trs.push(
                            <OrdinaryTr key={i} clickCb={clickCb} dataField={props.sideField.field} data-index={i}>
                                {tds}
                            </OrdinaryTr>
                        )



                    });
                    sideTables=(
                        <table className="table table-bordered center" key={0}>
                            <tbody>
                            <tr>{fields}</tr>
                            {trs}
                            </tbody>
                        </table>);
                    if(sideTables!==undefined&&sideTables!==null)
                        sideDist=(
                            <div className="col-sm-3" key={1}>
                                {sideTables}
                            </div>
                        )
                }else{}



            }


            var mainDist;
            if(sideDist!==undefined&&sideDist!==null)
                mainDist=(
                    <div className="col-sm-9" key={0}>
                    {tables}
                    </div>
                    );
            else
                mainDist=(
                  <div className="col-sm-12" key={0}>
                      {tables}
                  </div>
                );

            return (
                <div  className="ordinaryTable"  style={{margin:"20px"}}>
                    <div className="row">
                        {sideDist}
                        {mainDist}
                    </div>
                </div>


            )

        }


    }
});
export default OrdinaryTable;