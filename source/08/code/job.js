const _ = require('lodash');

class Instruction {
  constructor(rawInstruction) {
    this.executedCount = 0;
    this.altered = false;
    this.rawInstruction = rawInstruction;
  }

  hasAlreadyBeenExecuted() {
    return this.executedCount > 0;
  }

  do(currentIndex, currentCount) {
    ++this.executedCount;
  }

  isJmpOrNop() {
    throw new Error('implement me');
  }

  isJmp() {
    throw new Error('implement me');
  }

  resetExecutedCount() {
    this.executedCount = 0;
  }

  detectInfiniteLoop() {
    throw new Error('implement me');
  }

  static buildFromRawInstruction(rawInstruction) {
    const [operation, value] = rawInstruction.split(' ');
    if(operation === 'acc') {
      return new AccInstruction(value, rawInstruction);
    }
    if(operation === 'jmp') {
      return new JmpInstruction(value, rawInstruction);
    }
    if(operation === 'nop') {
      return new NopInstruction(value, rawInstruction);
    }
  }
}

class AccInstruction extends Instruction {
  constructor(value, rawInstruction) {
    super(rawInstruction);
    this.value = parseInt(value);
  }

  do(currentIndex, currentCount) {
    super.do(currentIndex, currentCount);
    return {
      newIndex: currentIndex + 1,
      newCount: currentCount + this.value,
    };
  }

  isJmpOrNop() {
    return false;
  }

  isJmp() {
    return false;
  }

  detectInfiniteLoop() {
    return false;
  }
}

class NopInstruction extends Instruction {
  constructor(value, rawInstruction) {
    super(rawInstruction);
    this.value = parseInt(value);
  }

  do(currentIndex, currentCount) {
    super.do(currentIndex, currentCount);
    return {
      newIndex: currentIndex + 1,
      newCount: currentCount,
    };
  }

  isJmpOrNop() {
    return true;
  }

  isJmp() {
    return false;
  }

  detectInfiniteLoop() {
    return false;
  }
}

class JmpInstruction extends Instruction {
  constructor(value, rawInstruction) {
    super(rawInstruction);
    this.value = parseInt(value);
  }

  do(currentIndex, currentCount) {
    super.do(currentIndex, currentCount);
    return {
      newIndex: currentIndex + this.value,
      newCount: currentCount,
    };
  }

  isJmpOrNop() {
    return true;
  }

  isJmp() {
    return true;
  }

  detectInfiniteLoop() {
    return this.executedCount > 0;
  }
}

class Instructions {
  constructor(rawInstructions) {
    this.instructions = _.map(_.filter(rawInstructions, (rawInstruction) => rawInstruction.length > 1), (rawInstruction) => {
      return Instruction.buildFromRawInstruction(rawInstruction);
    });
    this.internalCounter = 0;
    this.instructionBeingReplaced = null;
    this.indexOfInstructionBeingReplaced = null;
  }

  executeInstructionsUntilTwice() {
    const startIndex = 0;
    this.executeInstructionUntilTwice(startIndex);
  }

  executeInstructionsWhilePreventingInfiniteLoop() {
    _.each(this.instructions, (instruction) => {
      instruction.resetExecutedCount();
    });
    this.internalCounter = 0;
    const startIndex = 0;
    this.executeInstructionWhilePreventingInfiniteLoop(startIndex);
  }

  executeInstructionWhilePreventingInfiniteLoop(i) {
    const instruction = this.instructions[i];
    if(!instruction) {
      return;
    }
    if(instruction.detectInfiniteLoop()) {
      this.internalCounter = null;
      return;
    }

    const { newIndex, newCount } = instruction.do(i, this.internalCounter);
    this.internalCounter = newCount;
    this.executeInstructionWhilePreventingInfiniteLoop(newIndex);
  }

  executeInstructionUntilTwice(i) {
    const instruction = this.instructions[i];
    if(instruction.hasAlreadyBeenExecuted()) {
      return;
    }

    const { newIndex, newCount } = instruction.do(i, this.internalCounter);
    this.internalCounter = newCount;
    this.executeInstructionUntilTwice(newIndex);
  }

  getCounterForWorkingAlteredInstructions() {
    while(this.oneInstructionNotAlteredExists()) {
      this.alterNextInstruction();
      this.executeInstructionsWhilePreventingInfiniteLoop();
      this.resetAlteredInstruction();
      if(this.internalCounter) return;
    }
    this.internalCounter = -1;
  }

  alterNextInstruction() {
    this.indexOfInstructionBeingReplaced = _.findIndex((this.instructions), (instruction) => {
      return instruction.isJmpOrNop() && !instruction.altered;
    });
    this.instructionBeingReplaced = this.instructions[this.indexOfInstructionBeingReplaced];
    this.instructionBeingReplaced.altered = true;
    if(this.instructionBeingReplaced.isJmp()) {
      this.instructions[this.indexOfInstructionBeingReplaced] = new NopInstruction(this.instructionBeingReplaced.value);
    } else {
      this.instructions[this.indexOfInstructionBeingReplaced] = new JmpInstruction(this.instructionBeingReplaced.value);
    }
  }

  resetAlteredInstruction() {
    this.instructions[this.indexOfInstructionBeingReplaced] = this.instructionBeingReplaced;
  }

  oneInstructionNotAlteredExists() {
    return _.find((this.instructions), (instruction) => {
      return instruction.isJmpOrNop() && !instruction.altered;
    });
  }

}

module.exports = {
  jobOnlyOnce(rawInput) {
    const rawInstructions = rawInput.split('\n');
    const instructions = new Instructions(rawInstructions);
    instructions.executeInstructionsUntilTwice();
    return instructions.internalCounter;
  },


  jobReplace(rawInput) {
    const rawInstructions = rawInput.split('\n');
    const instructions = new Instructions(rawInstructions);
    instructions.getCounterForWorkingAlteredInstructions();
    return instructions.internalCounter;
  },
};
