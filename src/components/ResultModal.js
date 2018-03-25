import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components';

import { CenterView, SubmitText } from './general';

const Text = SubmitText.extend`
  color: black;
`;
const ResultView = styled.View`
  align-items: center;
`;

const ResultModal = ({
  modalVisible,
  onCloseModal,
  correctPercentage,
  correctCount,
}) => (
  <Modal animationType="slide" transparent={false} visible={modalVisible}>
    <CenterView style={{ justifyContent: 'space-around' }}>
      <ResultView>
        <Text>测试完成</Text>
        <Text>
          你回答正确了 {correctCount} 个, 正确率为 {correctPercentage}
        </Text>
        <FontAwesome name="check-circle" size={80} />
      </ResultView>
      <TouchableHighlight onPress={onCloseModal}>
        <Text>I get it!</Text>
      </TouchableHighlight>
    </CenterView>
  </Modal>
);

export default ResultModal;
