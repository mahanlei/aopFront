import React from "react";
import { Upload, Icon, message, Button, Radio } from 'antd'
// import { UploadOutlined } from '@ant-design/icons';
import './UploadFile.less'
import reqwest from 'reqwest';
// AntdIcon.add(UploadOutlined);
class UploadFile extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      fileList: [],
      type: 'aop'
    }
  }
  onChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  }
  checkBeforeUpload = (file) => {
    const isExcel = file.name.indexOf('.xlsx') != -1 || file.name.indexOf('.xls') != -1;
    // if (!isExcel) {
    //   message.error('您只能上传excel 文件!');
    //   return;
    // }
    // const isLt8M = file.size / 1024 / 1024 < 8;
    // if (!isLt8M) {
    //   message.error('图片大小必须小于8MB!');
    //   return;
    // }
    return new Promise((resolve, reject) => {
      if (!isExcel) {
        message.error('您只能上传excel 文件!')
        reject(file)
      } else {
        resolve(file)
      }
    })
  }
  handleFileChange = (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        if (file.response.code === 0 && file.status == 'done' ) {
          file.url = file.response.url;
        } else {
          message.error(file.response.msg || '上传失败')
        }

      }
      return file;
    });

    this.setState({ fileList });
  }
  render() {
    const props = {
      name: 'file',
      action: `http://112.124.17.107:8082/api/upload/${this.state.type}`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.handleFileChange,
      // customRequest: (info) => {
      //   const formData = new FormData();
      //   formData.append('file', info.file);//名字和后端接口名字对应
      //   reqwest({
      //     url: `http://112.124.17.107:8082/api/upload/${this.state.type}`,
      //     method: 'post',
      //     processData: false,
      //     data: formData,
      //     success: (res) => {//上传成功回调
      //       if (res.code === 0) {
      //         message.success('上传成功！');
      //       } else {
      //         message.error(res.msg);
      //       }
      //     },
      //     error: () => {//上传失败回调
      //       message.error('上传失败！');
      //     },
      //   })
      // },
      beforeUpload: this.checkBeforeUpload,

    }
    return (
      <div className="uploadMain">
        <div className="uploadForm">
          <Radio.Group onChange={this.onChange} value={this.state.type} style={{ marginBottom: 16 }}>
            <Radio value='aop'>aop</Radio>
            <Radio value='tox'>tox</Radio>
          </Radio.Group>
          <Upload {...props} fileList={this.state.fileList}>
            <Button style={{ width: 300 }}>
              上传文件
          </Button>
          </Upload>
        </div>
      </div>
    )
  }
}
export default UploadFile