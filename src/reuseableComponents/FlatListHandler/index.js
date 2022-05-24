import React, { PureComponent } from 'react';
import _ from 'lodash';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import ListEmpty from './ListEmpty';
import ListFooter from './ListFooter';
import Loader from '../Loader';
import { Colors } from '../../theme';

class FlatListHandler extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    loader: PropTypes.object,
    fetchRequest: PropTypes.func,
    pageSize: PropTypes.number,
  };

  static defaultProps = { data: [], isFetching: false, pageSize: 20 };

  keyExtractor = (item, index) => `item_${index}`;

  deBouncedOnEndReached = _.debounce(() => {
    const { meta, pageSize } = this.props;

    // dummy meta obj has current page set to 0. this check is needed in case if meta was not sent to flat list handler
    if (meta && meta.current_page) {
      const { current_page, last_page } = meta;
      if (current_page < last_page) {
        this.props.fetchRequest &&
          this.props.fetchRequest(true, { page: current_page + 1 });
      }
    } else {
      // executing the prev fetch logic
      this.props.fetchRequest &&
        this.props.data.length % pageSize === 0 &&
        this.props.fetchRequest(true, {
          page: this.props.data.length / pageSize + 1,
        });
    }
  }, 1000);

  onEndReached = () => this.deBouncedOnEndReached();
  /* old onEndReached
  onEndReached = () => {
    this.props.fetchRequest &&
      this.props.data.length % 10 === 0 &&
      this.props.fetchRequest(true, this.props.data.length / 10 + 1);
  };
*/
  onRefresh = () =>
    this.props.fetchRequest && this.props.fetchRequest(false, { page: 1 });

  renderItem = ({ index }) => (
    <View>
      <Text>{`item ${index}`}</Text>
    </View>
  );

  renderListEmpty = () =>
    !this.props.data.length && !this.props.isHideEmptyList ? (
      <ListEmpty message={this.props.emptyListMessage} />
    ) : null;

  renderListFooter = () => (
    <ListFooter
      showLoader={
        this.props.isFetching &&
        this.props.data.length % this.props.pageSize === 0
      }
    />
  );

  render() {
    const { contentContainerStyle, data, loader, isFetching } = this.props;

    if (isFetching && !data.length) {
      return loader ? loader : <Loader />;
    }

    /* Rendering contains all the basic stuff list needs to render it self what ever extra props is passed to is overridden */
    return (
      <FlatList
        bounces={true}
        ref={ref => {
          this.flatList = ref;
        }}
        data={data}
        renderItem={this.renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={this.onRefresh}
            tintColor={Colors.white}
          />
        }
        onEndReached={this.onEndReached}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={this.renderListEmpty}
        ListFooterComponent={this.renderListFooter}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...this.props}
        contentContainerStyle={
          data.length
            ? { paddingBottom: 50 }
            : [styles.contentContainerStyle, contentContainerStyle]
        }
      />
    );
  }
}

const styles = {
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default FlatListHandler;
