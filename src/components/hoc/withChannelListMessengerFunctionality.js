import React from 'react';
import { Text } from 'react-native';
import { ChannelPreview } from '../ChannelPreview';
import { ChannelPreviewMessenger } from '../ChannelPreviewMessenger';
import PropTypes from 'prop-types';

import { withChatContext } from '../../context';
import { LoadingIndicator } from '../LoadingIndicator';
import { LoadingErrorIndicator } from '../LoadingErrorIndicator';
import { EmptyStateIndicator } from '../EmptyStateIndicator';


export function withChannelListMessengerFunctionality(WrappedListComponent) {
    return withChatContext(
        class extends React.Component {
            static defaultProps = {
                Preview: ChannelPreviewMessenger,
                LoadingIndicator,
                LoadingErrorIndicator,
                EmptyStateIndicator,
                // https://github.com/facebook/react-native/blob/a7a7970e543959e9db5281914d5f132beb01db8d/Libraries/Lists/VirtualizedList.js#L466
                loadMoreThreshold: 2,
            };
            renderLoading = () => {
                const Indicator = this.props.LoadingIndicator;
                return <Indicator listType="channel" />;
            };

            renderLoadingError = () => {
                const Indicator = this.props.LoadingErrorIndicator;
                return <Indicator listType="channel" />;
            };

            renderEmptyState = () => {
                const Indicator = this.props.EmptyStateIndicator;
                return <Indicator listType="channel" />;
            };

            renderChannels = () => {
                let props = this.props;

                return (
                    <WrappedListComponent
                        data={this.props.channels}
                        onEndReached={this.props.loadNextPage}
                        onEndReachedThreshold={this.props.loadMoreThreshold}
                        ListEmptyComponent={this.renderEmptyState}
                        renderItem={({ item: channel }) => (
                            <ChannelPreview
                                {...this.props}
                                key={channel.cid}
                                channel={channel}
                                Preview={this.props.Preview}
                            />
                        )}
                        keyExtractor={(item) => item.cid}
                        {...props}
                    />
                )
            };

            render() {
                if (this.props.error) {
                    return this.renderLoadingError();
                } else if (this.props.loadingChannels) {
                    return this.renderLoading();
                } else {
                    return this.renderChannels();
                }
            }
        }
    );
}
