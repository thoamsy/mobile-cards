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
  onQuizRestart,
  correctPercentage,
  correctCount,
}) => (
  <Modal animationType="slide" transparent={false} visible={modalVisible}>
    <CenterView style={{ justifyContent: 'space-around' }}>
      <ResultView>
        <Text>Finish 🎉!</Text>
        <Text>
          你回答正确了 {correctCount} 个, 正确率为 {correctPercentage}
        </Text>
        <FontAwesome name="check-circle" size={80} />
      </ResultView>
      <View style={{ alignItems: 'center' }}>
        <TouchableHighlight onPress={onCloseModal}>
          <Text>Go Back</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={onQuizRestart}>
          <Text>Test Again</Text>
        </TouchableHighlight>
      </View>
    </CenterView>
  </Modal>
);

export default ResultModal;
