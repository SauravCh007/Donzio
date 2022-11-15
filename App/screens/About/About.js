import React, { useEffect, useState, Fragment } from 'react';
import { useWindowDimensions, View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import globalStyle from '../../helper/globalStyles';

const About = props => {
    const { width } = useWindowDimensions();
    const [htmlContent, setHtmlContent] = useState({ html: '' });
    const [showLoader, setLoader] = useState(false);

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        setLoader(true);
        const endPoint = `${Api.content}`;
        const { data, message } = await AuthApi.getDataFromServer(endPoint);
        if (!data) {
            setLoader(false);
            return false;
        }
        if (data && data.data) {
            setLoader(false);
            let about = data && data.data[0];
            setHtmlContent({ html: about.html_description });
        }
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyle.fragmentStyle_1} />
            <SafeAreaView style={globalStyle.aboutContainer}>
                <CustomHeader
                    headerTitle={'About'}
                    onPressDrawer={() => props.navigation.openDrawer()}
                    showDrawerIcon={true}
                />
                <View style={globalStyle.aboutContainer_1}>
                    {showLoader && <Loader />}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <RenderHtml contentWidth={width} source={htmlContent} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Fragment>
    );
};

export default About;
